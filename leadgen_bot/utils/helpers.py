from __future__ import annotations

import logging
import re
import time
from collections.abc import Mapping
from typing import Any

import requests

from utils.rate_limiter import RateLimiter


LOGGER = logging.getLogger(__name__)


def normalize_spaces(value: str | None) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def normalize_address(value: str | None) -> str:
    cleaned = normalize_spaces(value)
    return cleaned.rstrip(",")


def normalized_key(*parts: str | None) -> str:
    joined = " ".join(normalize_spaces(part).lower() for part in parts if part)
    return re.sub(r"[^a-z0-9]+", "", joined)


def request_json(
    session: requests.Session,
    method: str,
    url: str,
    *,
    timeout: int,
    max_retries: int,
    rate_limiter: RateLimiter,
    headers: Mapping[str, str] | None = None,
    **kwargs: Any,
) -> dict[str, Any]:
    last_error: Exception | None = None
    for attempt in range(1, max_retries + 1):
        try:
            rate_limiter.wait()
            response = session.request(
                method,
                url,
                timeout=timeout,
                headers=dict(headers or {}),
                **kwargs,
            )
            if response.status_code in {429, 500, 502, 503, 504}:
                raise requests.HTTPError(
                    f"Retryable HTTP {response.status_code}: {response.text[:200]}",
                    response=response,
                )
            response.raise_for_status()
            payload = response.json()
            if isinstance(payload, dict):
                return payload
            raise ValueError("Expected JSON object response")
        except (requests.RequestException, ValueError) as exc:
            last_error = exc
            if attempt == max_retries:
                break
            sleep_seconds = min(2**attempt, 30)
            LOGGER.warning("Request failed (%s/%s): %s", attempt, max_retries, exc)
            time.sleep(sleep_seconds)
    raise RuntimeError(f"Request failed after {max_retries} attempts: {last_error}")
