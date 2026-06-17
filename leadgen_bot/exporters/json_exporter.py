from __future__ import annotations

import json
from pathlib import Path

from models.business import BusinessLead


class JsonExporter:
    def export(self, leads: list[BusinessLead], path: Path) -> Path:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(
            json.dumps([lead.model_dump(mode="json") for lead in leads], indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        return path
