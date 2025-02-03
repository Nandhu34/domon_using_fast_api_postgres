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
    

@scedule_routes.post('/pause_domain')
def pause_domain(payload :validateSceduleDomain):
    # return str(payload)
    return pause_domain_view(payload.email , payload.domain_name)



@scedule_routes.post('/unpause_domain')
def pause_domain(payload :validateSceduleDomain):
    # return str(payload)
    return unpause_domain_view(payload.email , payload.domain_name)




@scedule_routes.post('/scedule_domain_expiry')
def scedule_domain_expiry(payload :validateSceduleDomain):
    return  scedule_domain_expiry_view(payload.email , payload.domain_name)
    


@scedule_routes.post('/update_domain_expiry')
def update_domain_expiry(payload :validateSceduleUpdateDomain):
    return  update_domain_expiry_view(payload.email , payload.domain_name, payload.updated_domain_name)
    

@scedule_routes.delete('/delete_domain_expiry')
def delete_domain_expiry(payload :validateSceduleDomain):
    return  delete_domain_expiry_view(payload.email , payload.domain_name)
    

@scedule_routes.post('/pause_domain_expiry')
def pause_domain_expiry(payload :validateSceduleDomain):
    return  pause_domain_expiry_view(payload.email , payload.domain_name)
    


@scedule_routes.post('/unpause_domain_expiry')
def unpause_domain_expiry(payload :validateSceduleDomain):
    return  unpause_domain_expiry_view(payload.email , payload.domain_name)
    


@scedule_routes.post('/get_domains')
def get_domain(body :getScheduledDomains,page_no: Optional[int] = 1, no_of_results: Optional[int] = 10 ):
 
    # offset= payload.offset
    # no_of_results = payload.no_of_results


    print(page_no , no_of_results)
    if page_no <=0:
        page_no =1
    if no_of_results <=0:
        no_of_results =10
    return get_sceduled_domains_view(page_no, no_of_results, body.email)



@scedule_routes.post('/get_expiry_domains')
def get_domain( body:getScheduledDomains,page_no: Optional[int] = 1, no_of_results: Optional[int] = 10):
 
    # offset= payload.offset
    # no_of_results = payload.no_of_results
    print(page_no , no_of_results)
    if page_no <=0:
        page_no =1
    if no_of_results <=0:
        no_of_results =10
    print(page_no , no_of_results)
    return get_sceduled_domains_expiry_view(page_no, no_of_results, body.email)

