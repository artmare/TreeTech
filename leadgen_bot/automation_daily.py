from __future__ import annotations

import json
import math
import re
import sys
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

import pandas as pd
import requests

from config import Settings
from exporters.csv_exporter import CsvExporter
from exporters.excel_exporter import ExcelExporter
from exporters.json_exporter import JsonExporter
from models.business import BusinessLead, SearchParams
from scrapers.overpass import OverpassScraper
from services.deduplicator import Deduplicator
from services.lead_filter import LeadFilter


VIENNA_TZ = ZoneInfo("Europe/Vienna")
FREE_EMAIL_DOMAINS = {
    "gmail.com",
    "gmx.at",
    "gmx.net",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "icloud.com",
    "aon.at",
    "yahoo.com",
    "yahoo.de",
    "163.com",
    "kabsi.at",
}
DIRECTORY_DOMAINS = {
    "facebook.com",
    "instagram.com",
    "tripadvisor.com",
    "wko.at",
    "herold.at",
    "firmenabc.at",
    "cylex.at",
    "yelp.com",
    "restaurantguru.com",
    "speisekarte.menu",
    "mapcarta.com",
    "wienerleben.at",
    "lieferservice.at",
    "lieferando.at",
    "mjam.net",
    "falstaff.com",
    "foursquare.com",
    "tomtom.com",
    "apple.com",
    "google.com",
    "google.at",
}
CHAIN_KEYWORDS = {
    "arbö",
    "arboe",
    "öamtc",
    "mcdonald",
    "burger king",
    "subway",
    "nordsee",
    "spar",
    "billa",
    "hofer",
    "lidl",
    "dm",
    "fressnapf",
}
SEARCH_PAIRS = {
    "broad": [
        ("Wien", "restaurant", 4500),
        ("Wien", "cafe", 4500),
        ("Graz", "barber", 5000),
        ("Linz", "beauty salon", 5000),
        ("Salzburg", "bakery", 5000),
        ("Innsbruck", "dentist", 5000),
        ("Klagenfurt am Wörthersee", "auto repair", 6500),
        ("Wels", "gym", 5000),
        ("St. Pölten", "florist", 5000),
        ("Villach", "bar", 5000),
    ],
    "midday": [
        ("Wiener Neustadt", "hairdresser", 5500),
        ("Baden", "massage", 5000),
        ("Mödling", "nail studio", 4500),
        ("Krems an der Donau", "konditorei", 5000),
        ("Tulln an der Donau", "bakery", 5000),
        ("Schwechat", "pizzeria", 4500),
        ("Leoben", "dentist", 5000),
        ("Steyr", "florist", 5000),
        ("Amstetten", "barber", 5000),
        ("Dornbirn", "beauty salon", 5000),
    ],
    "evening": [
        ("Klosterneuburg", "cafe", 4500),
        ("Perchtoldsdorf", "restaurant", 4500),
        ("Traiskirchen", "kebab", 5000),
        ("Stockerau", "imbiss", 5000),
        ("Korneuburg", "take away", 4500),
        ("Gänserndorf", "fast food", 5000),
        ("Hollabrunn", "bakery", 5000),
        ("Eisenstadt", "bar", 5000),
        ("Bregenz", "pub", 5000),
        ("Sankt Veit an der Glan", "auto repair", 6000),
        ("Villach", "dentist", 5000),
        ("Wels", "barber", 5000),
        ("St. Pölten", "beauty salon", 5000),
        ("Leoben", "auto repair", 5500),
        ("Steyr", "cafe", 5000),
        ("Dornbirn", "dentist", 5000),
        ("Bregenz", "beauty salon", 5000),
        ("Eisenstadt", "barber", 5000),
        ("Klosterneuburg", "dentist", 4500),
        ("Traiskirchen", "auto repair", 5500),
        ("Baden", "dentist", 5000),
        ("Mödling", "barber", 4500),
        ("Wiener Neustadt", "beauty salon", 5500),
        ("Tulln an der Donau", "auto repair", 5000),
        ("Krems an der Donau", "dentist", 5000),
        ("Villach", "barber", 5000),
        ("Stockerau", "dentist", 5000),
        ("Wels", "beauty salon", 5000),
        ("St. Pölten", "cafe", 5000),
        ("Leoben", "barber", 5000),
        ("Steyr", "dentist", 5000),
        ("Dornbirn", "auto repair", 5500),
        ("Bregenz", "dentist", 5000),
        ("Schwechat", "barber", 4500),
        ("Amstetten", "dentist", 5000),
        ("Eisenstadt", "cafe", 5000),
    ],
}


@dataclass
class CandidateRow:
    business_name: str
    category: str
    city: str
    address: str
    phone: str | None
    email: str | None
    source_url: str | None
    verification_sources_notes: str
    checked_at: str
    draft_status: str
    status_reason: str
    recipient_email: str | None
    suggested_subject: str | None
    gmail_draft_id: str | None
    run_label: str
    draft_body: str | None = None


def now_vienna() -> datetime:
    return datetime.now(VIENNA_TZ)


def choose_phase(hour: int) -> str:
    if hour < 10:
        return "broad"
    if hour < 16:
        return "midday"
    return "evening"


def normalize_text(value: str | None) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value).strip().casefold()


def normalize_domain(email: str | None) -> str:
    if not email or "@" not in email:
        return ""
    return email.split("@", 1)[1].strip().casefold()


def row_key(name: str, address: str) -> str:
    return f"{normalize_text(name)}|{normalize_text(address)}"


def extract_domain(url: str) -> str:
    cleaned = re.sub(r"^https?://", "", url.strip().casefold())
    return cleaned.split("/", 1)[0].removeprefix("www.")


def is_directory_domain(domain: str) -> bool:
    return any(domain == item or domain.endswith(f".{item}") for item in DIRECTORY_DOMAINS)


def probe_domain_response(session: requests.Session, domain: str) -> str | None:
    for url in [f"https://{domain}", f"http://{domain}", f"https://www.{domain}", f"http://www.{domain}"]:
        try:
            response = session.get(
                url,
                timeout=8,
                allow_redirects=True,
                headers={"User-Agent": "Mozilla/5.0"},
            )
            if response.status_code < 500:
                return response.url
        except Exception:
            continue
    return None


def build_subject(category: str, city: str, business_name: str) -> str:
    category_key = category.casefold()
    if "dent" in category_key:
        return f"Kurze Frage zu Ihrer Praxis-Website in {city}"
    if category_key in {"auto repair"}:
        return f"Kurze Frage zu Ihrer Werkstatt-Website in {city}"
    if category_key in {"restaurant", "cafe", "bakery", "konditorei", "bar", "pub", "pizzeria", "kebab", "imbiss", "bistro", "take away", "fast food"}:
        return f"Kurze Frage zu Ihrer Website in {city}"
    return f"Kurze Frage zu Ihrem Online-Auftritt in {city}"


def build_body(lead: BusinessLead, city: str) -> str:
    address_line = f" in {lead.address}" if lead.address else ""
    return (
        f"Guten Tag,\n\n"
        f"ich bin auf {lead.name} in {city} aufmerksam geworden und habe gesehen, "
        f"dass Ihr Betrieb online offenbar noch keine eigene Website hat.\n\n"
        f"Ich arbeite bei TreeTech und wir unterstützen österreichische Betriebe dabei, "
        f"mit einer klaren, professionellen Website sichtbarer zu werden und mehr Anfragen zu erhalten. "
        f"Gerade für {lead.name} können Informationen wie Leistungen, Öffnungszeiten, Standort{address_line} "
        f"und Kontaktmöglichkeiten online viel ausmachen.\n\n"
        f"Falls das für Sie interessant ist, kann ich Ihnen unverbindlich ein paar konkrete Ideen "
        f"für einen passenden Webauftritt zusammenstellen. Unsere Website und einige Projekte finden Sie hier: "
        f"https://treetech.vercel.app/\n\n"
        f"Wenn Sie möchten, antworte ich Ihnen gerne mit einem kurzen Vorschlag.\n\n"
        f"Freundliche Grüße\n"
        f"Artem\n"
        f"TreeTech"
    )


def save_raw_exports(leads: list[BusinessLead], output_dir: Path, city: str, category: str, stamp: str) -> None:
    slug = f"{city}_{category}_{stamp}".lower().replace(" ", "_")
    CsvExporter().export(leads, output_dir / f"{slug}.csv")
    JsonExporter().export(leads, output_dir / f"{slug}.json")
    ExcelExporter().export(leads, output_dir / f"{slug}.xlsx")


def fetch_search_results(session: requests.Session, query: str) -> list[dict[str, str]]:
    response = session.get(
        "https://html.duckduckgo.com/html/",
        params={"q": query},
        timeout=20,
        headers={"User-Agent": "Mozilla/5.0"},
    )
    response.raise_for_status()
    html = response.text
    matches = re.findall(
        r'<a[^>]+class="result__a"[^>]+href="(?P<href>[^"]+)"[^>]*>(?P<title>.*?)</a>',
        html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    results: list[dict[str, str]] = []
    for href, title in matches[:8]:
        clean_title = re.sub(r"<.*?>", "", title)
        results.append({"url": href, "title": clean_title})
    return results


def looks_like_official_domain(domain: str, lead: BusinessLead) -> bool:
    if not domain or is_directory_domain(domain):
        return False
    email_domain = normalize_domain(lead.email)
    if email_domain and email_domain not in FREE_EMAIL_DOMAINS and domain.endswith(email_domain):
        return True
    tokens = [token for token in re.split(r"[^a-z0-9]+", normalize_text(lead.name)) if len(token) > 2]
    root = domain.split(".", 1)[0]
    return sum(1 for token in tokens if token in root) >= 1


def verify_lead(
    session: requests.Session,
    lead: BusinessLead,
    city: str,
    duplicate_keys: set[str],
    duplicate_emails: set[str],
    duplicate_domains: set[str],
) -> CandidateRow:
    checked_at = now_vienna().strftime("%Y-%m-%d %H:%M:%S %Z")
    lead_key = row_key(lead.name, lead.address)
    email_domain = normalize_domain(lead.email)
    if lead_key in duplicate_keys:
        return CandidateRow(
            lead.name,
            lead.category,
            city,
            lead.address,
            lead.phone,
            lead.email,
            lead.source_url,
            "Bereits in früherem Lauf erfasst.",
            checked_at,
            "skipped_duplicate",
            "Name und Adresse bereits in einem früheren Report vorhanden.",
            lead.email,
            build_subject(lead.category, city, lead.name),
            None,
            "",
        )
    if lead.email and normalize_text(lead.email) in duplicate_emails:
        return CandidateRow(
            lead.name,
            lead.category,
            city,
            lead.address,
            lead.phone,
            lead.email,
            lead.source_url,
            "Empfängeradresse bereits in früherem Lauf verwendet.",
            checked_at,
            "skipped_duplicate",
            "Empfängeradresse bereits in einem früheren Report oder Draft vorhanden.",
            lead.email,
            build_subject(lead.category, city, lead.name),
            None,
            "",
        )
    if email_domain and email_domain not in FREE_EMAIL_DOMAINS and email_domain in duplicate_domains:
        return CandidateRow(
            lead.name,
            lead.category,
            city,
            lead.address,
            lead.phone,
            lead.email,
            lead.source_url,
            "Mail-Domain bereits in früherem Lauf verwendet.",
            checked_at,
            "skipped_duplicate",
            "Mail-Domain bereits in einem früheren Report vorhanden.",
            lead.email,
            build_subject(lead.category, city, lead.name),
            None,
            "",
        )
    if not lead.email:
        return CandidateRow(
            lead.name,
            lead.category,
            city,
            lead.address,
            lead.phone,
            None,
            lead.source_url,
            "Kein öffentliches E-Mail in OSM-Kontaktdaten gefunden.",
            checked_at,
            "skipped_no_email",
            "Öffentliche E-Mail-Adresse fehlt.",
            None,
            build_subject(lead.category, city, lead.name),
            None,
            "",
        )
    if email_domain and email_domain not in FREE_EMAIL_DOMAINS:
        reachable_url = probe_domain_response(session, email_domain)
        if reachable_url:
            return CandidateRow(
                lead.name,
                lead.category,
                city,
                lead.address,
                lead.phone,
                lead.email,
                lead.source_url,
                f"Mail-Domain erreichbar: {reachable_url}",
                checked_at,
                "skipped_has_website",
                f"Eigene Domain reagiert im Web: {reachable_url}",
                lead.email,
                build_subject(lead.category, city, lead.name),
                None,
                "",
            )
    if any(keyword in normalize_text(lead.name) for keyword in CHAIN_KEYWORDS):
        return CandidateRow(
            lead.name,
            lead.category,
            city,
            lead.address,
            lead.phone,
            lead.email,
            lead.source_url,
            "Ketten-/Markenname erkannt.",
            checked_at,
            "skipped_not_relevant",
            "Kette, Franchise oder klar nicht passender lokaler SMB-Lead.",
            lead.email,
            build_subject(lead.category, city, lead.name),
            None,
            "",
        )

    searches = []
    official_hit = None
    closed_hit = None
    try:
        searches = fetch_search_results(session, f"\"{lead.name}\" {city} Austria")
    except Exception as exc:
        searches = [{"url": "", "title": f"Suche fehlgeschlagen: {exc}"}]
    for result in searches:
        domain = extract_domain(result["url"]) if result["url"] else ""
        title = normalize_text(result["title"])
        if any(term in title for term in ("geschlossen", "permanently closed")):
            closed_hit = result
        if looks_like_official_domain(domain, lead):
            official_hit = result
            break

    notes = []
    if lead.source_url:
        notes.append(f"OSM: {lead.source_url}")
    for result in searches[:3]:
        if result["url"]:
            notes.append(f"Suche: {result['title']} ({result['url']})")
        else:
            notes.append(result["title"])

    if closed_hit:
        return CandidateRow(
            lead.name,
            lead.category,
            city,
            lead.address,
            lead.phone,
            lead.email,
            lead.source_url,
            " | ".join(notes),
            checked_at,
            "skipped_closed",
            "Treffer deuten auf geschlossen/permanently closed hin.",
            lead.email,
            build_subject(lead.category, city, lead.name),
            None,
            "",
        )
    if official_hit:
        return CandidateRow(
            lead.name,
            lead.category,
            city,
            lead.address,
            lead.phone,
            lead.email,
            lead.source_url,
            " | ".join(notes),
            checked_at,
            "skipped_has_website",
            f"Offizieller Webauftritt wahrscheinlich vorhanden: {official_hit['url']}",
            lead.email,
            build_subject(lead.category, city, lead.name),
            None,
            "",
        )

    subject = build_subject(lead.category, city, lead.name)
    body = build_body(lead, city)
    return CandidateRow(
        lead.name,
        lead.category,
        city,
        lead.address,
        lead.phone,
        lead.email,
        lead.source_url,
        " | ".join(notes) if notes else "Kein offizieller Webauftritt in der Suchprüfung gefunden.",
        checked_at,
        "ready_for_draft",
        "Verifiziert: öffentliches E-Mail vorhanden und kein offizieller Webauftritt gefunden.",
        lead.email,
        subject,
        None,
        "",
        draft_body=body,
    )


def load_existing_rows(report_paths: list[Path]) -> pd.DataFrame:
    frames: list[pd.DataFrame] = []
    for path in report_paths:
        try:
            frames.append(pd.read_excel(path))
        except Exception:
            continue
    if not frames:
        return pd.DataFrame()
    return pd.concat(frames, ignore_index=True)


def pick_search_pairs(today_rows: pd.DataFrame, phase: str) -> list[tuple[str, str, int]]:
    used_pairs: set[tuple[str, str]] = set()
    if not today_rows.empty and {"city", "category"}.issubset(today_rows.columns):
        for _, row in today_rows.iterrows():
            used_pairs.add((normalize_text(str(row.get("city", ""))), normalize_text(str(row.get("category", "")))))
    return [
        item
        for item in SEARCH_PAIRS[phase]
        if (normalize_text(item[0]), normalize_text(item[1])) not in used_pairs
    ]


def parse_args() -> tuple[str | None, int]:
    phase = None
    target = 40
    args = sys.argv[1:]
    index = 0
    while index < len(args):
        arg = args[index]
        if arg == "--phase" and index + 1 < len(args):
            phase = args[index + 1].strip().casefold()
            index += 2
            continue
        if arg == "--target" and index + 1 < len(args):
            target = int(args[index + 1])
            index += 2
            continue
        index += 1
    return phase, target


def main() -> None:
    settings = Settings.from_env()
    output_dir = settings.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)

    now = now_vienna()
    today_token = now.strftime("%Y%m%d")
    phase_override, target = parse_args()
    phase = phase_override or choose_phase(now.hour)
    run_label = f"{today_token}_{phase}_{now.strftime('%H%M%S')}"
    report_path = output_dir / f"austrian_no_website_leads_drafts_{today_token}.xlsx"
    pending_path = output_dir / f"austrian_no_website_pending_drafts_{today_token}_{phase}.json"

    existing_reports = sorted(output_dir.glob("austrian_no_website_leads_drafts_*.xlsx"))
    all_rows = load_existing_rows(existing_reports)
    today_rows = pd.read_excel(report_path) if report_path.exists() else pd.DataFrame()

    suppressed_rows = all_rows[all_rows.get("draft_status", pd.Series(dtype=str)).isin(["draft_created", "skipped_duplicate", "ready_for_draft"])] if not all_rows.empty else pd.DataFrame()
    duplicate_keys = {
        row_key(str(row.get("business_name", "")), str(row.get("address", "")))
        for _, row in suppressed_rows.iterrows()
    } if not suppressed_rows.empty else set()
    duplicate_emails = {
        normalize_text(str(row.get("recipient_email", "")))
        for _, row in suppressed_rows.iterrows()
        if str(row.get("recipient_email", "")).strip()
    } if not suppressed_rows.empty else set()
    duplicate_domains = {
        normalize_domain(str(row.get("recipient_email", "")))
        for _, row in suppressed_rows.iterrows()
        if normalize_domain(str(row.get("recipient_email", ""))) and normalize_domain(str(row.get("recipient_email", ""))) not in FREE_EMAIL_DOMAINS
    } if not suppressed_rows.empty else set()

    existing_today_drafts = int(
        today_rows.get("draft_status", pd.Series(dtype=str)).eq("draft_created").sum()
    ) if not today_rows.empty else 0
    remaining_target = max(target - existing_today_drafts, 0)

    backfill_items: list[dict[str, Any]] = []
    for old_pending in sorted(output_dir.glob("austrian_no_website_pending_drafts_*.json")):
        try:
            payload = json.loads(old_pending.read_text(encoding="utf-8"))
        except Exception:
            continue
        for item in payload:
            email = normalize_text(item.get("to"))
            key = row_key(item.get("business_name", ""), item.get("address", ""))
            if email and email not in duplicate_emails and key not in duplicate_keys:
                backfill_items.append(item)

    session = requests.Session()
    scraper = OverpassScraper(settings)
    leads_for_review: list[CandidateRow] = []

    for item in backfill_items:
        checked_at = now_vienna().strftime("%Y-%m-%d %H:%M:%S %Z")
        leads_for_review.append(
            CandidateRow(
                business_name=item.get("business_name", ""),
                category=item.get("category", ""),
                city=item.get("city", ""),
                address=item.get("address", ""),
                phone=item.get("phone"),
                email=item.get("to"),
                source_url=item.get("source_url"),
                verification_sources_notes="Backfill aus früher verifiziertem Pending-Draft.",
                checked_at=checked_at,
                draft_status="ready_for_draft",
                status_reason="Früher verifiziert; Gmail war damals nicht verfügbar.",
                recipient_email=item.get("to"),
                suggested_subject=item.get("subject"),
                gmail_draft_id=None,
                run_label=run_label,
                draft_body=item.get("body"),
            )
        )
        duplicate_emails.add(normalize_text(item.get("to")))

    pair_limit = 8 if phase == "broad" else 10
    if remaining_target == 0:
        pair_limit = 0
    for city, category, radius in pick_search_pairs(today_rows, phase)[:pair_limit]:
        params = SearchParams(city=city, country="Austria", radius=radius, category=category, limit=120)
        leads = scraper.search(params)
        deduped = Deduplicator().deduplicate(leads)
        filtered = LeadFilter().prepare(deduped, store_only_no_website=True)
        stamp = now_vienna().strftime("%Y%m%d_%H%M%S")
        save_raw_exports(filtered, output_dir, city, category, stamp)
        for lead in filtered:
            candidate = verify_lead(session, lead, city, duplicate_keys, duplicate_emails, duplicate_domains)
            candidate.run_label = run_label
            leads_for_review.append(candidate)
            if candidate.draft_status in {"ready_for_draft", "draft_created"}:
                duplicate_keys.add(row_key(candidate.business_name, candidate.address))
                if candidate.recipient_email:
                    duplicate_emails.add(normalize_text(candidate.recipient_email))
                    domain = normalize_domain(candidate.recipient_email)
                    if domain and domain not in FREE_EMAIL_DOMAINS:
                        duplicate_domains.add(domain)

    draft_ready = [row for row in leads_for_review if row.draft_status == "ready_for_draft"]
    pending_payload = [
        {
            "to": row.recipient_email,
            "subject": row.suggested_subject,
            "body": row.draft_body,
            "business_name": row.business_name,
            "city": row.city,
            "category": row.category,
            "address": row.address,
            "phone": row.phone,
            "source_url": row.source_url,
            "verification_sources_notes": row.verification_sources_notes,
            "run_label": row.run_label,
        }
        for row in draft_ready
    ]
    pending_path.write_text(json.dumps(pending_payload, ensure_ascii=False, indent=2), encoding="utf-8")

    new_frame = pd.DataFrame(
        [
            {
                "business_name": row.business_name,
                "category": row.category,
                "city": row.city,
                "address": row.address,
                "phone": row.phone,
                "email": row.email,
                "source_url": row.source_url,
                "verification_sources_notes": row.verification_sources_notes,
                "checked_at": row.checked_at,
                "draft_status": row.draft_status,
                "status_reason": row.status_reason,
                "recipient_email": row.recipient_email,
                "suggested_subject": row.suggested_subject,
                "gmail_draft_id": row.gmail_draft_id,
                "run_label": row.run_label,
            }
            for row in leads_for_review
        ]
    )
    final_frame = pd.concat([today_rows, new_frame], ignore_index=True) if not today_rows.empty else new_frame
    final_frame.to_excel(report_path, index=False)

    summary = {
        "phase": phase,
        "run_label": run_label,
        "today_existing_rows": int(len(today_rows)),
        "today_existing_draft_created": existing_today_drafts,
        "remaining_target_before_run": remaining_target,
        "new_rows": int(len(new_frame)),
        "ready_for_draft": int(sum(1 for row in leads_for_review if row.draft_status == "ready_for_draft")),
        "report_path": str(report_path),
        "pending_path": str(pending_path),
    }
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == "__main__":
    main()
