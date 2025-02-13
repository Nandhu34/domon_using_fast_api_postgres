from fastapi import Request , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt , JWTError 
from starlette.middleware.base import BaseHTTPMiddleware

from starlette.responses import JSONResponse
SECRETE_KEY = ""
ALGORITHM = ""





async def auth_validation():
    return ()

class auth_middleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        token = request.headers.get("Authorization")
        if not token or not token.startswith("Bearer"):
            return JSONResponse(status_code=401, content={"detail": "Missing or invalid token"})

        token = token.split(" ")[1]
        try :
            payload = jwt.decode(token, SECRETE_KEY, algorithms=[ALGORITHM])
            request.role.user = {"email":payload.get("email"), "role":payload.get("role")}
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")

        response = await call_next(request)
        return response 