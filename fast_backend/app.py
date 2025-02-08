from fastapi import FastAPI 
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
# from routers.login_routes import login_routes
from v1_app.routers.login_routers import login_routes
from v1_app.routers.home_routes import other_services_routes
from v1_app.routers.scedule_routes import scedule_routes
from v1_app.routers.analytics_routes import analytics_routes
# pip install apscheduler
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager

import datetime 
import os
def run_daily_task():
    print(f"Running daily task at {datetime.datetime.now()}...")
    os.system("python3 /home/nandhakumar/work_space/final_code/domon/fast_backend/domain_script/domain_imperation_process.py")
    os.system("python3 /home/nandhakumar/work_space/final_code/domon/fast_backend/domain_expiry_script/domain_expiration_check.py")

# Scheduler instance  minutes days
scheduler = BackgroundScheduler()
scheduler.add_job(run_daily_task, "interval", days=7)  # Runs once every 24 hours

# Use FastAPI's lifespan event for proper startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting application and scheduler...")
    scheduler.start()  # Start the scheduler when the app starts
    yield  # Runs the application
    print("Shutting down application and scheduler...")
    scheduler.shutdown()  # Shutdown the scheduler when the app stops

# Initialize FastAPI with lifespan event
app = FastAPI(lifespan=lifespan)

# CORS Middleware
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
app.include_router(analytics_routes, prefix="/v1/analytics", tags=["analytics "])



if __name__ == '__main__':
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
