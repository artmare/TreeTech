from models.business import BusinessLead, WebsiteStatus
from services.lead_filter import LeadFilter


def test_scores_high_quality_no_website_lead() -> None:
    lead = BusinessLead(
        name="Joe's Cafe",
        category="Cafe",
        address="Example Street 1",
        phone="+431234567",
        email=None,
        website_status=WebsiteStatus.NO_WEBSITE,
        rating=4.5,
        review_count=80,
        source_platform="test",
    )

    assert LeadFilter().score(lead) == 95
