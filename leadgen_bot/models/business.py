from __future__ import annotations

from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, field_validator


class WebsiteStatus(StrEnum):
    NO_WEBSITE = "NO_WEBSITE"
    HAS_WEBSITE = "HAS_WEBSITE"
    UNKNOWN = "UNKNOWN"


class BusinessLead(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str
    category: str
    address: str = ""
    phone: str | None = None
    email: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    source_url: str | None = None
    website_url: str | None = None
    website_status: WebsiteStatus = WebsiteStatus.UNKNOWN
    rating: float | None = Field(default=None, ge=0, le=5)
    review_count: int | None = Field(default=None, ge=0)
    source_platform: str
    lead_score: int = Field(default=0, ge=0, le=100)

    @field_validator("website_url", mode="before")
    @classmethod
    def normalize_empty_website(cls, value: object) -> str | None:
        if value is None:
            return None
        if isinstance(value, str) and not value.strip():
            return None
        return str(value)

    @field_validator("source_url", "website_url")
    @classmethod
    def tolerate_non_http_source_urls(cls, value: str | None) -> str | None:
        if value is None:
            return None
        # Pydantic HttpUrl is intentionally not used in the model because some
        # public sources provide map links that are valid but non-canonical.
        return value


class SearchParams(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    city: str
    country: str
    radius: int = Field(default=5_000, gt=0)
    category: str
    keywords: list[str] = Field(default_factory=list)
    limit: int = Field(default=100, gt=0)

    @property
    def location_text(self) -> str:
        return f"{self.city}, {self.country}"

    @property
    def query_text(self) -> str:
        terms = [self.category, *self.keywords, self.city, self.country]
        return " ".join(term for term in terms if term)
