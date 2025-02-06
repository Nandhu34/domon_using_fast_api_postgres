from fastapi import APIRouter, Query ,Depends , Body

from   ..db_operations.db_creation import * 
from  ..request_validators.analytics_validators import * 
from fastapi.responses import JSONResponse
from ..views.analytics_view import  *

analytics_routes = APIRouter()




@analytics_routes.post('/get_analytics')
# body:ValidateGetAnalysis,  
def get_result_from_backend(
  no_of_results: int = Query(10, description="Number of results per page", gt=0),
    page_no: int = Query(1, description="Page number", gt=0),
    body: ValidateGetAnalysis = Body(...)
):
    selected_option = body.domain_type.value
    print("sel",[selected_option])
    print(selected_option =='all')
    if selected_option == "all":
        
        selected_option=["domain", "domain_expiry"]
    if type(selected_option) != type([1,2]):
        selected_option = [selected_option]
    print(body.dict())
    keyword_options = body.dict()['keywords_list']
    print(" keyword option --------------------------------------------", keyword_options)
    start_date = body.dict()['start_date']
    end_date = body.dict()['end_date']
    email = body.dict()['email']
    print(page_no)
    print(no_of_results)

    print(selected_option)
    # return 
    return   get_analytics_view(selected_option ,keyword_options , str(start_date) , str(end_date)  , email , no_of_results, page_no)




@analytics_routes.post('/get_all_keywords')
def get_all_keywords(email :EmailStr =Query()):
    print(email)
    return get_all_keywords_view(email)


@analytics_routes.get('/keyword_result_chart')
def get_chart_data(email:EmailStr = Query()):
    print(email)
    return get_chart_view(email)




@analytics_routes.get('/get_domain_expiry_chart')
def get_domain_expiry_chart(email:EmailStr = Query()):
    print(email)
    return get_domain_expiry_view(email)





@analytics_routes.get('/get_impersination_chart')
def get_impersination_chart(email:EmailStr = Query()):
    print(email)
    return get_impersination_chart_view(email)





# @analytics_routes.get('/get_domain_founded_day_chart')
# def get_domain_founded_day_chart(email:EmailStr = Query()):
#     print(email)
#     return get_domain_founded_day_chart_view(email)




