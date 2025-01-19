from fastapi import APIRouter, Query
from ..views.home_views import * 
from   ..db_operations.db_creation import * 
from fastapi.responses import JSONResponse

home_routes = APIRouter()

@home_routes.get('/get_whois')
def get_whois(get_whois: str = Query(...)):
    print(get_whois)
    return get_whois_view(get_whois)
    

