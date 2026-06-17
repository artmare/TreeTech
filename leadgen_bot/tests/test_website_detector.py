from models.business import WebsiteStatus
from services.website_detector import WebsiteDetector


def test_detects_missing_website() -> None:
    detector = WebsiteDetector()

    assert detector.detect(None) == WebsiteStatus.NO_WEBSITE
    assert detector.detect("") == WebsiteStatus.NO_WEBSITE


def test_detects_existing_website() -> None:
    detector = WebsiteDetector()

    assert detector.detect("https://example.com") == WebsiteStatus.HAS_WEBSITE
