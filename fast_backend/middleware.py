from fastapi import Depends , HTTPException , Request

from jose import jwt , JWTError 

import config 

SECRET_KEY =config.secret_key
ALGORITHM = config.jwt_algorithm


def validate_token_and_role(required_role:list ):
    def role_dependency(request: Request):
        token = request.headers.get("Authorization")
        if not token or not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Missing or invalid token")
        token = token.split(" ")[1]
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_role = payload.get("role")
            print(required_role)
            if len(required_role) ==0:
                 return {"email": payload.get("email"), "role": user_role}
                 
            print(user_role, required_role)
            if user_role not  in  required_role:
                raise HTTPException(status_code=403, detail="Permission denied")

            return {"email": payload.get("email"), "role": user_role}
        except JWTError:
                raise HTTPException(status_code=401, detail="Invalid token")
    return role_dependency

