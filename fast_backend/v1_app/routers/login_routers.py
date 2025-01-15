from fastapi import APIRouter 

# import  vviews.login_views as  views
import  v1_app.views.login_views as views
login_routes = APIRouter()


@login_routes.get('/register')
def  register_new_user():
    return   views.register_new_user_view()
