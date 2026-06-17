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


class GooglePlacesScraper(BusinessScraper):
    source_name = "Google Places"
    TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"

    def __init__(self, settings: Settings) -> None:
        if not settings.google_places_api_key:
            raise ValueError("GOOGLE_PLACES_API_KEY is not configured")
        self._settings = settings
        self._session = requests.Session()
        self._rate_limiter = RateLimiter(settings.requests_per_second)
        self._validator = DataValidator()
        self._website_detector = WebsiteDetector()

    def search(self, params: SearchParams) -> list[BusinessLead]:
        leads: list[BusinessLead] = []
        next_page_token: str | None = None

        while len(leads) < params.limit:
            query: dict[str, Any] = {
                "key": self._settings.google_places_api_key,
                "query": params.query_text,
                "radius": params.radius,
            }
            if next_page_token:
                query["pagetoken"] = next_page_token
                time.sleep(2)

            payload = request_json(
                self._session,
                "GET",
                self.TEXT_SEARCH_URL,
                timeout=self._settings.http_timeout_seconds,
                max_retries=self._settings.max_retries,
                rate_limiter=self._rate_limiter,
                params=query,
            )
            status = payload.get("status")
            if status not in {"OK", "ZERO_RESULTS"}:
                raise RuntimeError(f"Google Places search failed with status {status}: {payload.get('error_message')}")
            if status == "ZERO_RESULTS":
                break

            for item in payload.get("results", []):
                if len(leads) >= params.limit:
                    break
                lead = self._lead_from_result(item, params.category)
                if lead:
                    leads.append(lead)

            next_page_token = payload.get("next_page_token")
            if not next_page_token:
                break

        return leads

    def _lead_from_result(self, item: dict[str, Any], category: str) -> BusinessLead | None:
        place_id = item.get("place_id")
        details = self._details(place_id) if place_id else {}
        geometry = item.get("geometry", {}).get("location", {})
        website_url = details.get("website")

        name = item.get("name") or details.get("name")
        if not name:
            return None

        phone = self._validator.normalize_phone(
            details.get("international_phone_number") or details.get("formatted_phone_number")
        )
        email = self._validator.normalize_email(details.get("email"))
        address = normalize_address(details.get("formatted_address") or item.get("formatted_address"))

        return BusinessLead(
            name=name,
            category=category,
            address=address,
            phone=phone,
            email=email,
            latitude=geometry.get("lat"),
            longitude=geometry.get("lng"),
            source_url=f"https://www.google.com/maps/place/?q=place_id:{place_id}" if place_id else None,
            website_url=website_url,
            website_status=self._website_detector.detect(website_url),
            rating=item.get("rating"),
            review_count=item.get("user_ratings_total"),
            source_platform=self.source_name,
        )

    def _details(self, place_id: str | None) -> dict[str, Any]:
        if not place_id:
            return {}
        payload = request_json(
            self._session,
            "GET",
            self.DETAILS_URL,
            timeout=self._settings.http_timeout_seconds,
            max_retries=self._settings.max_retries,
            rate_limiter=self._rate_limiter,
            params={
                "key": self._settings.google_places_api_key,
                "place_id": place_id,
                "fields": "name,formatted_address,formatted_phone_number,international_phone_number,website,url",
            },
        )
        if payload.get("status") != "OK":
            LOGGER.warning("Google Places details failed for %s: %s", place_id, payload.get("status"))
            return {}
        result = payload.get("result", {})
        return result if isinstance(result, dict) else {}
