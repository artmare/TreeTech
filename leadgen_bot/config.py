from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


load_dotenv()


@dataclass(frozen=True)
class Settings:
    google_places_api_key: str | None
    overpass_url: str
    overpass_fallback_urls: tuple[str, ...]
    nominatim_url: str
    photon_url: str
    http_timeout_seconds: int
    requests_per_second: float
    max_retries: int
    user_agent: str
    output_dir: Path

    @classmethod
    def from_env(cls) -> "Settings":
        return cls(
            google_places_api_key=os.getenv("GOOGLE_PLACES_API_KEY") or None,
            overpass_url=os.getenv("OVERPASS_URL", "https://overpass-api.de/api/interpreter"),
            overpass_fallback_urls=tuple(
                url.strip()
                for url in os.getenv(
                    "OVERPASS_FALLBACK_URLS",
                    "https://maps.mail.ru/osm/tools/overpass/api/interpreter,https://overpass.kumi.systems/api/interpreter,https://overpass.osm.ch/api/interpreter",
                ).split(",")
                if url.strip()
            ),
            nominatim_url=os.getenv("NOMINATIM_URL", "https://nominatim.openstreetmap.org/search"),
            photon_url=os.getenv("PHOTON_URL", "https://photon.komoot.io/api/"),
            http_timeout_seconds=int(os.getenv("HTTP_TIMEOUT_SECONDS", "20")),
            requests_per_second=float(os.getenv("REQUESTS_PER_SECOND", "1.0")),
            max_retries=int(os.getenv("MAX_RETRIES", "3")),
            user_agent=os.getenv(
                "USER_AGENT",
                "LeadGenBot/1.0 (manual-review; contact@example.com)",
            ),
            output_dir=Path(os.getenv("OUTPUT_DIR", "output")),
        )
