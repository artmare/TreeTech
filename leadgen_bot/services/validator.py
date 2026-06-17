from __future__ import annotations

import re


class DataValidator:
    EMAIL_PATTERN = re.compile(r"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$", re.IGNORECASE)

    def normalize_phone(self, phone: str | None) -> str | None:
        if not phone:
            return None
        phone = phone.strip()
        leading_plus = phone.startswith("+")
        digits = re.sub(r"\D+", "", phone)
        if len(digits) < 6:
            return None
        return f"+{digits}" if leading_plus else digits

    def normalize_email(self, email: str | None) -> str | None:
        if not email:
            return None
        cleaned = email.strip().lower()
        return cleaned if self.EMAIL_PATTERN.match(cleaned) else None

    def normalize_address(self, address: str | None) -> str:
        if not address:
            return ""
        return re.sub(r"\s+", " ", address).strip().rstrip(",")
