from fastapi import APIRouter, Query
from ..views.home_views import * 
from   ..db_operations.db_creation import * 
from fastapi.responses import JSONResponse

home_routes = APIRouter()

@home_routes.get('/get_whois')
def get_whois(domain_name : str = Query(...)):
    print(domain_name)
    return get_whois_view(domain_name)
    



@home_routes.get('/dns_lookup')
def get_dns_lookup(domain_name: str = Query(...)):
    # print(get_whois)
    return dns_lookup_view(domain_name)
    



@home_routes.get('/get_ip')
def get_ip(domain_name: str = Query(...)):
    print(domain_name)
    return get_ip_view(domain_name)
    



@home_routes.get('/get_mx_record')
def get_mx_record(domain_name: str = Query(...)):
    print(domain_name)
    return get_mx_record_view(domain_name)
    



@home_routes.get('/get_register_Score')
def get_whois(domain_name: str = Query(...)):
    print(domain_name)
    return register_Score_view(domain_name)
    
