from pydantic import BaseModel, ValidationError, validator, EmailStr , Field
from enum import Enum


class role_enum(str,Enum ):
    user = 'user'
    admin = ' admin'



class register_validator(BaseModel):
    email:EmailStr | None 
    username :str = Field(min_length = 5 ,max_length=15 )
    password : str = Field(min_length = 8 ,max_length=15)
    confirm_password : str = Field(min_length = 8 ,max_length=15)
    role : role_enum









# data ={
#     "email":"nandhakumarselva2000@gmail.com"
#     , "username":"nandhahghr",
#     "password":"1234576475", 
#     "confirm_password":"1234576475",
#     "role":"user"
    
# }

# register_validator(**data)
