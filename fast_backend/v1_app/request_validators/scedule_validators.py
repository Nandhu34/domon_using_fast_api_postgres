from pydantic import BaseModel, EmailStr, validator
from typing import List
from typing import Optional
from enum import Enum



class validateSceduleDomain(BaseModel):
    email:EmailStr
    domain_name:str




class validateSceduleUpdateDomain(BaseModel):
    email:EmailStr
    domain_name:str
    updated_domain_name :str 
    
    def validate_domain_name_updateion(cls, value, values):
        if values.get('domain_name') == value:
            raise ValueError('The updated domain name must be different from the original domain name.')
        return value
