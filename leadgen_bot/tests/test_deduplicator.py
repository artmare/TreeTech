from models.business import BusinessLead, WebsiteStatus
from services.deduplicator import Deduplicator


def test_deduplicates_by_name_and_address() -> None:
    first = BusinessLead(
        name="Joe's Cafe",
        category="Cafe",
        address="Example Street 1",
        phone=None,
        website_status=WebsiteStatus.NO_WEBSITE,
        source_platform="Google Places",
    )
    second = BusinessLead(
        name="Joe's Cafe",
        category="Cafe",
        address="Example Street 1",
        phone="+431234567",
        website_status=WebsiteStatus.NO_WEBSITE,
        source_platform="OpenStreetMap",
    )

    result = Deduplicator().deduplicate([first, second])

    assert len(result) == 1
    assert result[0].phone == "+431234567"
    assert result[0].source_platform == "Google Places+OpenStreetMap"
