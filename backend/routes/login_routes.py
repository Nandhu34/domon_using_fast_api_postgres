from flask import Blueprint , request , abort
login_blueprint = Blueprint('login_route',__name__)
from logger_configure.logger_setup import logger
from validators.auth_validators import register_validator
from auth_helpers.hasing_dependendies import hash_password , check_pasword
from auth_helpers.token_based_dependendies import  create_new_jwt_token,get_expiration_time
from models.db_initialiation import user_details_collection



import datetime


@login_blueprint.route('/login', methods=['POST'])
def login():
    return ({"data":"sampel login route "})



@login_blueprint.route('/register', methods=['POST'])
def register_new_user():
    logger.info("register route ")
    request_body = request.get_json()
    # check all are in correct format 
    try :
        validated_data = register_validator(**request_body)
    except Exception as e:
        print(e)
        abort(422, description=f"errror at validating body-register new user:{str(e)}")

    logger.info(request_body)
    email = validated_data.email
    username = validated_data.username
    password = validated_data.password
    confirm_password = validated_data.confirm_password
    role = validated_data.role
    if user_details_collection.find_one({"email":email}):
        return({"status":"error", "message":"user aldredy found"},403)
    


    logger.info(f"Email: {email}, Username: {username}, Role: {role}")
    if password != confirm_password:
        abort(422, description=f"password mismatch register new user: password and confirm password mismatch")

    hashed_password = hash_password(password)
    if True  :
        expiration_time = get_expiration_time(2,"minute")
        print(expiration_time)
        if not expiration_time :
            abort(422 , description=f"error in generating expiration time ")
                
        access_token  = create_new_jwt_token({"email":email,"role":role},expiration_time)
        if not access_token :
            abort(422 , description=f"error in generating access token")
        refresh_token_time  = get_expiration_time(1,"hour")
        if not refresh_token_time :
            abort(422 , description=f"error in generating expiration time ")
                
        refresh_token  = create_new_jwt_token({"email":email,"role":role},refresh_token_time)
        if not refresh_token :
            abort(422 , description=f"error in generating refresh token")
        final_schema = {
            "email":email,
            "username":username, 
            "password":hashed_password, 
            "access_token":access_token, 
            "refresh_token":refresh_token,
            "reset_password_token":"",
            "reset_password_token_expired":False ,
            "date_of_last_login":datetime.datetime.now().isoformat()
            

        }
        insert_assurence = user_details_collection.insert_one(final_schema)
        if insert_assurence.inserted_id:
            return({"status":"success", "message":"user registered successfully"},200)
        else:
            return ({"status":"error","message":"something went wrong try again later"},400)

