from fastapi import FastAPI 
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
# from routers.login_routes import login_routes
from v1_app.routers.login_routers import login_routes
from v1_app.routers.home_routes import other_services_routes
from v1_app.routers.scedule_routes import scedule_routes

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(login_routes, prefix="/v1/auth", tags=["authorization"])
app.include_router(other_services_routes , prefix="/v1/other_services", tags=["home"])
app.include_router(scedule_routes, prefix="/v1/scedule", tags=["scedule"])



if __name__ == '__main__':
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
