from fastapi import APIRouter, Query
from ..views.analytics_view import * 
from   ..db_operations.db_creation import * 
from  ..request_validators. import * 
from fastapi.responses import JSONResponse
from ..views.scedule_expiry_views import * 

scedule_routes = APIRouter()