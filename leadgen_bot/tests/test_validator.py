from services.validator import DataValidator


def test_normalize_phone_keeps_international_prefix() -> None:
    validator = DataValidator()

    assert validator.normalize_phone("+43 1 234 567") == "+431234567"


def test_invalid_email_returns_none() -> None:
    validator = DataValidator()

    assert validator.normalize_email("not-an-email") is None
    assert validator.normalize_email("Sales@Example.COM") == "sales@example.com"
