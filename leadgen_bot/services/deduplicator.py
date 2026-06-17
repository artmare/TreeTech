from __future__ import annotations

from models.business import BusinessLead, WebsiteStatus
from utils.helpers import normalized_key


class Deduplicator:
    def deduplicate(self, leads: list[BusinessLead]) -> list[BusinessLead]:
        merged: dict[str, BusinessLead] = {}
        for lead in leads:
            key = self._key_for(lead)
            if key not in merged:
                merged[key] = lead
                continue
            merged[key] = self._merge(merged[key], lead)
        return list(merged.values())

    def _key_for(self, lead: BusinessLead) -> str:
        if lead.address:
            return normalized_key(lead.name, lead.address)
        if lead.latitude is not None and lead.longitude is not None:
            return normalized_key(
                lead.name,
                f"{round(lead.latitude, 4)}",
                f"{round(lead.longitude, 4)}",
            )
        return normalized_key(lead.name, lead.phone)

    def _merge(self, current: BusinessLead, incoming: BusinessLead) -> BusinessLead:
        website_status = current.website_status
        website_url = current.website_url
        if current.website_status != WebsiteStatus.HAS_WEBSITE and incoming.website_url:
            website_status = incoming.website_status
            website_url = incoming.website_url

        return current.model_copy(
            update={
                "phone": current.phone or incoming.phone,
                "email": current.email or incoming.email,
                "latitude": current.latitude if current.latitude is not None else incoming.latitude,
                "longitude": current.longitude if current.longitude is not None else incoming.longitude,
                "source_url": current.source_url or incoming.source_url,
                "website_url": website_url,
                "website_status": website_status,
                "rating": max(filter(None, [current.rating, incoming.rating]), default=None),
                "review_count": max(filter(None, [current.review_count, incoming.review_count]), default=None),
                "source_platform": self._merge_source(current.source_platform, incoming.source_platform),
            }
        )

    def _merge_source(self, current: str, incoming: str) -> str:
        parts = []
        for value in [current, incoming]:
            for part in value.split("+"):
                if part not in parts:
                    parts.append(part)
        return "+".join(parts)
