from __future__ import annotations

from pathlib import Path

import pandas as pd

from models.business import BusinessLead


class ExcelExporter:
    def export(self, leads: list[BusinessLead], path: Path) -> Path:
        path.parent.mkdir(parents=True, exist_ok=True)
        pd.DataFrame([lead.model_dump(mode="json") for lead in leads]).to_excel(path, index=False)
        return path
