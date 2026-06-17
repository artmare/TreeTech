from __future__ import annotations

from models.business import WebsiteStatus


class WebsiteDetector:
    def detect(self, website_url: str | None) -> WebsiteStatus:
        if website_url is None:
            return WebsiteStatus.NO_WEBSITE
        cleaned = website_url.strip()
        if not cleaned:
            return WebsiteStatus.NO_WEBSITE
        if cleaned.lower() in {"unknown", "n/a", "none", "null"}:
            return WebsiteStatus.UNKNOWN
        return WebsiteStatus.HAS_WEBSITE
