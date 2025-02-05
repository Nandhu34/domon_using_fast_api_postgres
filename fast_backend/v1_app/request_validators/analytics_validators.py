from pydantic import BaseModel, EmailStr, validator ,Field 
from typing import List, Optional
from enum import Enum
from datetime import date
from fastapi  import Query

class DomainEnum(str, Enum):
    all = "all"
    domain = "domain"
    domain_expiry = "domain_expiry"

class ValidateGetAnalysis(BaseModel):
    domain_type: DomainEnum = DomainEnum.all  # Default to "all"
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    keywords_list: Optional[List[str]] = []
    email: EmailStr

    @validator("end_date")
    def check_date_order(cls, end_date, values):
        """Ensure that end_date is not before start_date."""
        start_date = values.get("start_date")
        if start_date and end_date < start_date:
            raise ValueError("end_date cannot be before start_date")
        return end_date
