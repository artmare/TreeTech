from __future__ import annotations

from abc import ABC, abstractmethod

from models.business import BusinessLead, SearchParams


class BusinessScraper(ABC):
    source_name: str

    @abstractmethod
    def search(self, params: SearchParams) -> list[BusinessLead]:
        raise NotImplementedError
