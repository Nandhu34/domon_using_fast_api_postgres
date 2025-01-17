from fastapi import FastAPI 
from fastapi import FastAPI, HTTPException, BackgroundTasks
# from routers.login_routes import login_routes
from v1_app.routers.login_routers import login_routes

app = FastAPI()

app.include_router(login_routes, prefix="/v1/auth", tags=["authorization"])


if __name__ == '__main__':
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)