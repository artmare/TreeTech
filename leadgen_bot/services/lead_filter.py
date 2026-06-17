from __future__ import annotations

from models.business import BusinessLead, WebsiteStatus


class LeadFilter:
    def score(self, lead: BusinessLead) -> int:
        score = 0
        if lead.website_status == WebsiteStatus.NO_WEBSITE:
            score += 50
        if (lead.review_count or 0) > 50:
            score += 20
        if (lead.rating or 0) > 4.0:
            score += 15
        if lead.phone:
            score += 10
        if lead.email:
            score += 5
        return min(score, 100)

    def prepare(
        self,
        leads: list[BusinessLead],
        *,
        store_only_no_website: bool = True,
    ) -> list[BusinessLead]:
        scored = [lead.model_copy(update={"lead_score": self.score(lead)}) for lead in leads]
        if store_only_no_website:
            scored = [lead for lead in scored if lead.website_status == WebsiteStatus.NO_WEBSITE]
        return sorted(scored, key=lambda lead: lead.lead_score, reverse=True)
