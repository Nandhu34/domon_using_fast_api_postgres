from fastapi import APIRouter, Query ,Depends , Body

from   ..db_operations.db_creation import * 
from  ..request_validators.analytics_validators import * 
from fastapi.responses import JSONResponse
from ..views.analytics_view import  get_analytics_view

analytics_routes = APIRouter()




@analytics_routes.post('/get_analytics')
# body:ValidateGetAnalysis,  
def get_result_from_backend(
  no_of_results: int = Query(10, description="Number of results per page", gt=0),
    page_no: int = Query(1, description="Page number", gt=0),
    body: ValidateGetAnalysis = Body(...)
):
    selected_option = body.dict()['domain_type']
    keyword_options = body.dict()['keywords_list']
    start_date = body.dict()['start_date']
    end_date = body.dict()['end_date']
    email = body.dict()['email']
    print(page_no)
    print(no_of_results)

    print(selected_option)
    if selected_option == "all":
        selected_option= ['domain', 'domain_expiry']
    return   get_analytics_view(selected_option ,keyword_options , start_date , end_date  , email , no_of_results, page_no)

