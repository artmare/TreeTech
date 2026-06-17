from __future__ import annotations

import time
from threading import Lock


class RateLimiter:
    def __init__(self, requests_per_second: float) -> None:
        self._interval = 1.0 / max(requests_per_second, 0.1)
        self._lock = Lock()
        self._last_call = 0.0

    def wait(self) -> None:
        with self._lock:
            elapsed = time.monotonic() - self._last_call
            remaining = self._interval - elapsed
            if remaining > 0:
                time.sleep(remaining)
            self._last_call = time.monotonic()
