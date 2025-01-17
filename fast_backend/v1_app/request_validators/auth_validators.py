from pydantic import BaseModel, EmailStr, validator
from typing import List
from typing import Optional
from enum import Enum

class validate_register_new_user(BaseModel):
    email: EmailStr
    username: str
    password: str
    confirm_password: str
    role: str

    @validator('username')
    def username_length(cls, username):
        print(" checking username ")
        if not (6 <= len(username) <= 15):
            raise ValueError('Username must be between 6 and 15 characters')
        return username

    @validator('password')
    def password_length(cls, password):
        if not (6 <= len(password) <= 15):
            raise ValueError('Password must be between 6 and 15 characters')
        return password

    @validator('confirm_password')
    def passwords_match(cls, confirm_password, values):
        password = values.get('password')
        if password != confirm_password:
            raise ValueError('Passwords do not match')
        return confirm_password

    @validator('role')
    def role_valid(cls, role):
        print(" cheking role ")
        valid_roles = ['user']  
        if role not in valid_roles:
            raise ValueError(f'Role must be one of {valid_roles}')
        return role

class RoleEnum(str, Enum):
    user = "user"
    admin = "admin"


class validate_login_new_user(BaseModel):
    email: EmailStr  # Pydantic validates email format automatically
    password: str  # Add validation rules for the password
    role: RoleEnum

    @validator('password')
    def password_strength(cls, password):
        # Example validation: password should be at least 8 characters long
        if not (6 <= len(password) <= 15):
            raise ValueError('Password must be between 6 and 15 characters')
        return password
    

class validate_forget_password_payload(BaseModel):
    email:EmailStr
    role:RoleEnum


class validate_reset_password(BaseModel):
    new_password:str 
    @validator('new_password')
    def password_strength(cls, password):
        # Example validation: password should be at least 8 characters long
        if not (6 <= len(password) <= 15):
            raise ValueError('Password must be between 6 and 15 characters')
        return password


class validate_delete_request_payload(BaseModel):
    email:EmailStr
    role:RoleEnum
    