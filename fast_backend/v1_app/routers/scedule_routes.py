from fastapi import APIRouter, Query
from ..views.scedule_views import * 
from   ..db_operations.db_creation import * 
from  ..request_validators.scedule_validators import * 
from fastapi.responses import JSONResponse
from ..views.scedule_expiry_views import * 

scedule_routes = APIRouter()



@scedule_routes.post('/scedule_domain')
def scedule_domain(payload :validateSceduleDomain):
    print(payload.email)
    print(payload.domain_name)
    return scedule_domain_view (payload.email , payload.domain_name)
    



@scedule_routes.post('/update_domain')
def update_domain(payload :validateSceduleUpdateDomain):
    return  update_domain_view(payload.email , payload.domain_name, payload.updated_domain_name)
    

@scedule_routes.delete('/delete_domain')
def delete_domain(payload :validateSceduleDomain):
    return delete_domain_view(payload.email , payload.domain_name)
    

@scedule_routes.put('/pause_domain')
def pause_domain(payload :validateSceduleDomain):
    return pause_domain_view(payload.email , payload.domain_name)
    

@scedule_routes.post('/scedule_domain_expiry')
def scedule_domain_expiry(payload :validateSceduleDomain):
    return  scedule_domain_expiry_view(payload.email , payload.domain_name)
    


@scedule_routes.post('/update_domain_expiry')
def update_domain_expiry(payload :validateSceduleUpdateDomain):
    return  update_domain_expiry_view(payload.email , payload.domain_name, payload.updated_domain_name)
    

@scedule_routes.delete('/delete_domain_expiry')
def delete_domain_expiry(payload :validateSceduleDomain):
    return  delete_domain_expiry_view(payload.email , payload.domain_name)
    

@scedule_routes.put('/pause_domain_expiry')
def pause_domain_expiry(payload :validateSceduleDomain):
    return  pause_domain_expiry_view(payload.email , payload.domain_name)
    
