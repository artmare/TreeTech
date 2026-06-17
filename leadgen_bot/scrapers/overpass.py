from __future__ import annotations

import logging
import time
from typing import Any

import requests

from config import Settings
from models.business import BusinessLead, SearchParams
from scrapers.base import BusinessScraper
from services.validator import DataValidator
from services.website_detector import WebsiteDetector
from utils.helpers import normalize_address, request_json
from utils.rate_limiter import RateLimiter


LOGGER = logging.getLogger(__name__)


CATEGORY_TAGS: dict[str, list[tuple[str, str]]] = {
    "restaurant": [("amenity", "restaurant")],
    "cafe": [("amenity", "cafe")],
    "bar": [("amenity", "bar"), ("amenity", "pub"), ("amenity", "biergarten")],
    "pub": [("amenity", "pub"), ("amenity", "bar")],
    "pizzeria": [("amenity", "restaurant"), ("cuisine", "pizza"), ("cuisine", "italian")],
    "kebab": [("amenity", "fast_food"), ("cuisine", "kebab"), ("cuisine", "turkish")],
    "imbiss": [("amenity", "fast_food"), ("shop", "street_vendor")],
    "bistro": [("amenity", "restaurant"), ("amenity", "cafe"), ("amenity", "fast_food")],
    "bakery": [("shop", "bakery")],
    "konditorei": [("shop", "pastry"), ("shop", "bakery")],
    "take away": [("amenity", "fast_food"), ("amenity", "restaurant")],
    "fast food": [("amenity", "fast_food")],
    "auto repair": [("shop", "car_repair"), ("craft", "auto_repair")],
    "barber": [("shop", "hairdresser")],
    "hairdresser": [("shop", "hairdresser")],
    "beauty salon": [("shop", "beauty")],
    "nail studio": [("shop", "beauty"), ("beauty", "nails")],
    "massage": [("shop", "massage"), ("healthcare", "alternative"), ("amenity", "spa")],
    "dentist": [("amenity", "dentist")],
    "dental clinic": [("amenity", "dentist")],
    "gym": [("leisure", "fitness_centre"), ("amenity", "gym")],
    "florist": [("shop", "florist")],
    "tailor": [("shop", "tailor"), ("craft", "tailor")],
    "dry cleaner": [("shop", "dry_cleaning"), ("shop", "laundry")],
    "locksmith": [("craft", "locksmith"), ("shop", "locksmith")],
    "plumber": [("craft", "plumber")],
    "electrician": [("craft", "electrician")],
    "painter": [("craft", "painter")],
    "roofer": [("craft", "roofer")],
    "cleaning service": [("craft", "cleaning"), ("office", "company")],
    "pet groomer": [("shop", "pet_grooming"), ("shop", "pet")],
    "retail": [("shop", "*")],
    "store": [("shop", "*")],
}


class OverpassScraper(BusinessScraper):
    source_name = "OpenStreetMap"

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._session = requests.Session()
        self._rate_limiter = RateLimiter(settings.requests_per_second)
        self._validator = DataValidator()
        self._website_detector = WebsiteDetector()

    def search(self, params: SearchParams) -> list[BusinessLead]:
        try:
            lat, lon = self._geocode(params.location_text)
            query = self._build_radius_query(params.category, lat, lon, params.radius)
        except RuntimeError as exc:
            LOGGER.warning("Geocoding failed (%s). Falling back to Overpass city-area search.", exc)
            query = self._build_area_query(params.category, params.city)
        payload = self._execute_overpass_query(query)
        elements = payload.get("elements", [])
        leads = [self._lead_from_element(element, params.category) for element in elements[: params.limit]]
        return [lead for lead in leads if lead is not None]

    def _execute_overpass_query(self, query: str) -> dict[str, Any]:
        urls = [self._settings.overpass_url, *self._settings.overpass_fallback_urls]
        last_error: Exception | None = None
        for url in dict.fromkeys(urls):
            try:
                LOGGER.info("Querying Overpass endpoint %s", url)
                return request_json(
                    self._session,
                    "POST",
                    url,
                    timeout=self._settings.http_timeout_seconds,
                    max_retries=self._settings.max_retries,
                    rate_limiter=self._rate_limiter,
                    headers={
                        "User-Agent": self._settings.user_agent,
                        "Accept": "application/json",
                    },
                    data={"data": query},
                )
            except Exception as exc:
                last_error = exc
                LOGGER.warning("Overpass endpoint failed (%s): %s", url, exc)
        raise RuntimeError(f"All Overpass endpoints failed: {last_error}")

    def _geocode(self, location: str) -> tuple[float, float]:
        try:
            return self._geocode_nominatim(location)
        except RuntimeError as exc:
            LOGGER.warning("Nominatim geocoding failed (%s). Trying Photon fallback.", exc)
            return self._geocode_photon(location)

    def _geocode_nominatim(self, location: str) -> tuple[float, float]:
        last_error: Exception | None = None
        for attempt in range(1, self._settings.max_retries + 1):
            try:
                self._rate_limiter.wait()
                response = self._session.get(
                    self._settings.nominatim_url,
                    timeout=self._settings.http_timeout_seconds,
                    headers={"User-Agent": self._settings.user_agent},
                    params={"q": location, "format": "json", "limit": 1},
                )
                response.raise_for_status()
                data = response.json()
                if not data:
                    raise RuntimeError(f"Could not geocode location: {location}")
                return float(data[0]["lat"]), float(data[0]["lon"])
            except Exception as exc:
                last_error = exc
                if attempt < self._settings.max_retries:
                    time.sleep(min(2**attempt, 30))
        raise RuntimeError(f"Nominatim failed after retries: {last_error}")

    def _geocode_photon(self, location: str) -> tuple[float, float]:
        payload = request_json(
            self._session,
            "GET",
            self._settings.photon_url,
            timeout=self._settings.http_timeout_seconds,
            max_retries=self._settings.max_retries,
            rate_limiter=self._rate_limiter,
            headers={"User-Agent": self._settings.user_agent},
            params={"q": location, "limit": 1},
        )
        features = payload.get("features", [])
        if not features:
            raise RuntimeError(f"Could not geocode location: {location}")
        coordinates = features[0]["geometry"]["coordinates"]
        return float(coordinates[1]), float(coordinates[0])

    def _build_radius_query(self, category: str, lat: float, lon: float, radius: int) -> str:
        filters = CATEGORY_TAGS.get(category.lower(), [("name", "*")])
        blocks: list[str] = []
        for key, value in filters:
            selector = f'["{key}"]' if value == "*" else f'["{key}"="{value}"]'
            for osm_type in ["node", "way", "relation"]:
                blocks.append(f'  {osm_type}{selector}(around:{radius},{lat},{lon});')
        joined = "\n".join(blocks)
        return f"""
[out:json][timeout:60];
(
{joined}
);
out center;
"""

    def _build_area_query(self, category: str, city: str) -> str:
        filters = CATEGORY_TAGS.get(category.lower(), [("name", "*")])
        blocks: list[str] = []
        safe_city = city.replace('"', '\\"')
        for key, value in filters:
            selector = f'["{key}"]' if value == "*" else f'["{key}"="{value}"]'
            for osm_type in ["node", "way", "relation"]:
                blocks.append(f"  {osm_type}{selector}(area.searchArea);")
        joined = "\n".join(blocks)
        return f"""
[out:json][timeout:60];
(
  area["boundary"="administrative"]["name"="{safe_city}"];
  area["boundary"="administrative"]["name:en"="{safe_city}"];
)->.searchArea;
(
{joined}
);
out center;
"""

    def _lead_from_element(self, element: dict[str, Any], category: str) -> BusinessLead | None:
        tags = element.get("tags", {})
        name = tags.get("name")
        if not name:
            return None

        lat = element.get("lat") or element.get("center", {}).get("lat")
        lon = element.get("lon") or element.get("center", {}).get("lon")
        website_url = tags.get("website") or tags.get("contact:website")
        phone = self._validator.normalize_phone(tags.get("phone") or tags.get("contact:phone"))
        email = self._validator.normalize_email(tags.get("email") or tags.get("contact:email"))
        address = self._address_from_tags(tags)
        osm_type = element.get("type")
        osm_id = element.get("id")

        return BusinessLead(
            name=name,
            category=category,
            address=address,
            phone=phone,
            email=email,
            latitude=float(lat) if lat is not None else None,
            longitude=float(lon) if lon is not None else None,
            source_url=f"https://www.openstreetmap.org/{osm_type}/{osm_id}" if osm_type and osm_id else None,
            website_url=website_url,
            website_status=self._website_detector.detect(website_url),
            rating=None,
            review_count=None,
            source_platform=self.source_name,
        )

    def _address_from_tags(self, tags: dict[str, Any]) -> str:
        street = " ".join(
            part
            for part in [tags.get("addr:street"), tags.get("addr:housenumber")]
            if part
        )
        parts = [
            street,
            tags.get("addr:postcode"),
            tags.get("addr:city"),
            tags.get("addr:country"),
        ]
        return normalize_address(", ".join(part for part in parts if part))
