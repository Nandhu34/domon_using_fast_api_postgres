from flask import Blueprint , request , abort
from logger_configure.logger_setup import logger
from validators.auth_validators import register_validator , login_validator , forget_password_validator , reset_password_validator
from auth_helpers.hasing_dependendies import hash_password , check_pasword
from auth_helpers.token_based_dependendies import  create_new_jwt_token,get_expiration_time , decode_token_data , check_token_expired
from models.db_initialiation import user_details_collection
from helpers.get_auth_token_data import get_auth_and_decode_data
import datetime



login_blueprint = Blueprint('login_route',__name__)


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
        expiration_time = get_expiration_time(5,"hour")
        print(expiration_time)
        if not expiration_time :
            abort(422 , description=f"error in generating expiration time ")
                
        access_token  = create_new_jwt_token({"email":email,"role":role},expiration_time)
        if not access_token :
            abort(422 , description=f"error in generating access token")
        refresh_token_time  = get_expiration_time(12,"hour")
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
            "role":role,
            "reset_password_token":"",
            "reset_password_token_expired":False ,

            "date_of_last_login":datetime.datetime.now().isoformat()
            

        }
        insert_assurence = user_details_collection.insert_one(final_schema)
        if insert_assurence.inserted_id:
            return({"status":"success", "message":f"{role} registered successfully"},200)
        else:
            return ({"status":"error","message":"something went wrong try again later"},400)



@login_blueprint.route('/login', methods=['POST'])
def login():
    try :
        data = request.get_json()
        validated_data = login_validator(**data)
       
    except Exception as e:
        abort (422, description =f"error in login validation:{str(e)} ")

    email = validated_data.email
    password = validated_data.password
    role = validated_data.role
    registered_details = user_details_collection.find_one({"email":email, "role":role})

    if registered_details == None:

            abort (404, description ="user account not found")
    # check password 
    if  not check_pasword(registered_details['password'], password):
        abort(401, description="password mismatch : enter correct password")
    expiration_time = get_expiration_time(5,"hour")
    print(expiration_time)
    if not expiration_time :
        abort(422 , description=f"error in generating expiration time ")
            
    access_token  = create_new_jwt_token({"email":email,"role":role},expiration_time)
    if not access_token :
        abort(422 , description=f"error in generating access token")
    refresh_token_time  = get_expiration_time(12,"hour")
    if not refresh_token_time :
        abort(422 , description=f"error in generating expiration time ")
            
    refresh_token  = create_new_jwt_token({"email":email,"role":role},refresh_token_time)
    if not refresh_token :
        abort(422 , description=f"error in generating refresh token")
    check_updating = user_details_collection.update_one({"email":email, "role":role},{"$set":{"access_token":access_token,"refresh_token":refresh_token,"date_of_last_login":datetime.datetime.now().isoformat()}})
    if check_updating.modified_count==1:
        return ({"status":"success","message":f"{role} login successfull"},201)
    else:
        return ({"status":"error","message":"something went wrong try again later"},400)






@login_blueprint.route('/forget-password', methods=['POST'])
def forget_password():
    from helpers.send_gmail import send_mail
    # try:
    #         token  = request.headers.get('Authorization').split(' ')[1]
    #         print(token )
    #         data = decode_token_data(token)
    #         print(data)

    #         # validated_data = forget_password_validator(**data)
    # except Exception as e:
    #     abort (422, description =" valiudation error in forgets password request body")
    data = get_auth_and_decode_data()
    if not data :
      abort(400, description = "token has been expired")

    email = data['email']
    role = data['role']
    subject ="forget password link!"
    user_details = user_details_collection.find_one({"email":email, "role":role})
    if not user_details :
            abort(404,description= "no user details found")
    expiration_date = get_expiration_time(5, "hour")
    if expiration_date :
        payload={"email":email,"role":role,"password":str(user_details['password'])}
        
        forget_password_token=create_new_jwt_token(payload, expiration_date)
        print(forget_password_token ,"forget-toekn")
        if  not forget_password_token:
            abort(422 , description=f"error in generating reset password  token")
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmRoYWt1bWFyc2VsdmEyMDAwQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwicGFzc3dvcmQiOiJiJyQyYiQxMiRBS21TUWl4d2g0L1FTcnNZdk9pTXplWnUzSnMvSkxSQXltNHNyMFI1UjRHSnM5Y2ZtM2g3SyciLCJleHAiOjE3MzI2ODg4OTZ9.PHUnEX3cq3f3-T23677G4AptEdfqu9c-akInKobRX2M
        reset_url=f"http://127.0.0.1:5003/v1/auth/reset_password/{forget_password_token}"
        msg_body = f'''<html>
        <body>
        <p> hey {user_details['username'], }</p>
        <br>
        <p><b>click here to reset password </b><p>
        <p><u>Link will valid for only 5 minutes </p></u>
        <a href={reset_url} style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;"/>Reset Your Password </a>
        </body>
        </html>
        '''

    send_mail([email], subject,msg_body)
    update_token_db = user_details_collection.update_one({"email":email, "role":role}, {"$set":{"reset_password_token":forget_password_token,"reset_password_token_expired":False}})
    if update_token_db.modified_count ==1:
        logger.info(" url has been updated in db ")
        return ({"status":"success", "message":f"Reset Token link has been send to your mail {email}"},201)
    else :
        return ({"status":"error", "error_message":"some thing went wrong try after some time "},404)



@login_blueprint.route('/reset_password/<token>', methods=['POST'])

def reset_password(token):
    try :
        new_password = request.get_json()
        new_password = new_password['new_password']
        # token_data = decode_token_data()
        token_data = get_auth_and_decode_data()
        
        email_from_headers = token_data['email']
        role= token_data['role']
        data = request.get_json()
        validated_data = reset_password_validator(**data)
    except Exception as e:
        abort (422, description =f"valiudation error in reset password request body{str(e)}")
    try:
        is_expired = check_token_expired(token)
        if is_expired:
            abort(401, description="Token  expired : your token has been expired")

        
    except Exception as e:
          abort(401, description=f"something went wrong try again later error in reset password route {str(e)}")
    decoded_value = decode_token_data(token)
    print("emailfromheaders",email_from_headers)
    print("decodevalue",decoded_value['email'])
    if decoded_value['email'] != email_from_headers:
        abort(400, description ="reset password token email not matched with header email")
    print({"email":decoded_value['email'],"role":decoded_value['role'],"reset_password_token":token})
    check_user_found = user_details_collection.find_one({"email":decoded_value['email'],"role":decoded_value['role'],"reset_password_token":token})
    print(token)
    print(check_user_found)
    if  check_user_found == None :
        abort(401, description="forget password token not matched")
    if check_user_found['reset_password_token_expired']  == True and  check_user_found['reset_password_token']== token:
        print(token)
        return ({"status":"error", "error_message":"token has been aldredy used"},401)
    updated_passcode = user_details_collection.update_one({"email":decoded_value['email'],"role":decoded_value['role'],"reset_password_token":token},{"$set":{"reset_password_token_expired":True, "password":hash_password(new_password)}})
    if updated_passcode.modified_count ==1:
        return ({"status":"success", "message" :"new password has been updated"},200)
    return({"status":"error", "error_message":"something went wrong"})
          