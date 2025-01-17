from fastapi import APIRouter 
from  ..request_validators.auth_validators import  *
from fastapi import BackgroundTasks

import  v1_app.views.login_views as views
login_routes = APIRouter()


@login_routes.post('/register')
def  register_new_user(user_request : validate_register_new_user):
    print(user_request)

    response =    views.register_new_user_view(user_request)
    return response




@login_routes.post('/login')
def  login_user(user_request : validate_login_new_user):
    print(user_request)

    response =    views.login_user_view(user_request)
    return response







@login_routes.post('/forget-password')
async def  forget_password(background_tasks: BackgroundTasks, user_request : validate_forget_password_payload):
    # print(user_request.email)

    response =   await   views.forget_password_view(user_request,background_tasks)
    return response






@login_routes.post('/reset-password/{forget_password_token}')
def  reset_password(forget_password_token:str,request: validate_reset_password):

    

    response =    views.reset_password_view(forget_password_token , request.dict()['new_password'])
    return response








@login_routes.put('/update_user')
def  update_password():


    response = "update user is pending"

    # response =    views.reset_password_view()
    return response






@login_routes.delete('/delete_user')
def  delete_user(delete_request_payload:validate_delete_request_payload):


    response =    views.delete_user_view(delete_request_payload)
    return response


