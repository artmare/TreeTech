from __future__ import annotations

import logging
from datetime import datetime
from pathlib import Path
from typing import Annotated

import typer

from config import Settings
from exporters.csv_exporter import CsvExporter
from exporters.excel_exporter import ExcelExporter
from exporters.json_exporter import JsonExporter
from models.business import BusinessLead, SearchParams
from scrapers.base import BusinessScraper
from scrapers.google_places import GooglePlacesScraper
from scrapers.overpass import OverpassScraper
from services.deduplicator import Deduplicator
from services.lead_filter import LeadFilter
from utils.logger import setup_logging


LOGGER = logging.getLogger(__name__)


def build_scrapers(settings: Settings, source: str) -> list[BusinessScraper]:
    source = source.lower()
    scrapers: list[BusinessScraper] = []
    if source in {"auto", "google"} and settings.google_places_api_key:
        scrapers.append(GooglePlacesScraper(settings))
    elif source == "google":
        raise typer.BadParameter("GOOGLE_PLACES_API_KEY is required when --source google is used.")

    if source in {"auto", "overpass"} and not scrapers:
        scrapers.append(OverpassScraper(settings))
    return scrapers


def collect_leads(scrapers: list[BusinessScraper], params: SearchParams) -> list[BusinessLead]:
    collected: list[BusinessLead] = []
    for scraper in scrapers:
        try:
            LOGGER.info("Searching %s", scraper.source_name)
            collected.extend(scraper.search(params))
        except Exception as exc:
            LOGGER.exception("%s failed: %s", scraper.source_name, exc)
            if scraper.source_name == "Google Places":
                LOGGER.info("Falling back to OpenStreetMap if configured.")
    return collected


def run(
    city: Annotated[str, typer.Option(help="City to search in.")],
    country: Annotated[str, typer.Option(help="Country to search in.")],
    category: Annotated[str, typer.Option(help="Business category, e.g. restaurant, cafe, dentist.")],
    radius: Annotated[int, typer.Option(help="Search radius in meters.")] = 5_000,
    limit: Annotated[int, typer.Option(help="Maximum number of raw results to collect.")] = 100,
    keyword: Annotated[list[str] | None, typer.Option("--keyword", "-k", help="Additional search keyword.")] = None,
    source: Annotated[str, typer.Option(help="auto, google, or overpass.")] = "auto",
    output_dir: Annotated[Path | None, typer.Option(help="Directory for CSV, JSON, and XLSX exports.")] = None,
    include_unknown: Annotated[bool, typer.Option(help="Also export UNKNOWN website status leads.")] = False,
    include_with_websites: Annotated[bool, typer.Option(help="Also export businesses that have websites.")] = False,
    verbose: Annotated[bool, typer.Option("--verbose", "-v", help="Enable debug logging.")] = False,
) -> None:
    setup_logging(verbose)
    settings = Settings.from_env()
    out_dir = output_dir or settings.output_dir

    params = SearchParams(
        city=city,
        country=country,
        radius=radius,
        category=category,
        keywords=keyword or [],
        limit=limit,
    )
    scrapers = build_scrapers(settings, source)
    if not scrapers:
        raise typer.BadParameter("No data source available. Configure Google Places or use --source overpass.")

    leads = collect_leads(scrapers, params)
    if not leads and source == "auto" and settings.google_places_api_key:
        LOGGER.info("No leads from Google Places; trying OpenStreetMap fallback.")
        leads = collect_leads([OverpassScraper(settings)], params)

    deduped = Deduplicator().deduplicate(leads)
    store_only_no_website = not include_unknown and not include_with_websites
    filtered = LeadFilter().prepare(deduped, store_only_no_website=store_only_no_website)
    if include_unknown and not include_with_websites:
        filtered = [lead for lead in filtered if lead.website_status in {"NO_WEBSITE", "UNKNOWN"}]

    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    slug = f"{params.city}_{params.category}_{stamp}".lower().replace(" ", "_")
    csv_path = CsvExporter().export(filtered, out_dir / f"{slug}.csv")
    json_path = JsonExporter().export(filtered, out_dir / f"{slug}.json")
    xlsx_path = ExcelExporter().export(filtered, out_dir / f"{slug}.xlsx")

    typer.echo(f"Collected: {len(leads)}")
    typer.echo(f"After dedupe: {len(deduped)}")
    typer.echo(f"Exported: {len(filtered)}")
    typer.echo(f"CSV: {csv_path}")
    typer.echo(f"JSON: {json_path}")
    typer.echo(f"Excel: {xlsx_path}")


if __name__ == "__main__":
    typer.run(run)
