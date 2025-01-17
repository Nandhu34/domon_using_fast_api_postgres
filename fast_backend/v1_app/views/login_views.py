from ..auth_helpers.token_generation import *
from   ..db_operations.db_creation import * 
from fastapi.responses import JSONResponse
from ..auth_helpers.password_encode_decode import * 
import datetime
from ..report_generation.send_forget_password_email import   * 
def register_new_user_view(token_payload):
   # check user aldredy present 
   email = token_payload.email 
   password = token_payload.password

   search_result = user_details_collection.find_one({"email":email})
   print(search_result , "res ")
   if search_result    :
      return JSONResponse(
            content={"message": "User already registered", "status": "failure"},
            status_code=406
        )
   # create access token 
   generated_access_token = create_access_token({"email":token_payload.email,"role":token_payload.role})
   print(generated_access_token, "token ")
   if not  generated_access_token :
      return JSONResponse(
            content={"message": "error in generating access token", "status": "failure"},
            status_code=400
        )
     
   # create refresh token 
   generated_refresh_token = create_refresh_token({"email":token_payload.email,"role":token_payload.role})
   print(generated_refresh_token, "token ")
   if not  generated_refresh_token :
      return JSONResponse(
            content={"message": "error in generating refresh  token", "status": "failure"},
            status_code=400
        )
   
   # hashing password 
   hashed_password = hash_password(password)
   if   not hash_password :

         return JSONResponse(
            content={"message": "error in hashing password", "status": "failure"},
            status_code=400
        )
   
   schema_for_new_user = {
           
            "username": token_payload.username ,
            "email": token_payload.email,
            "password":hashed_password,
            "access_token":generated_access_token,
            "refresh_token": generated_refresh_token,
            "date_of_register": datetime.datetime.now().isoformat(),
            "date_of_last_login": "",
            "role": "user",
            "reset_password_token": None,
            "reset_password_token_expire": False  ,
           
            }
   acknowledge_for_register = user_details_collection.insert_one(schema_for_new_user)
   if acknowledge_for_register.inserted_id:
       return JSONResponse(
            content={"message":  "user registered successfully","access_token":generated_access_token,"refresh_token":generated_refresh_token,"status": "success"},
            status_code=200
        )
   else:
       return JSONResponse(
            content={"message": "something went wrong in db while user creation", "status": "failure"},
            status_code=400
        )
   



def login_user_view(login_payload ):
    # check for db presence 

   check_login_presence = user_details_collection.find_one({"email":login_payload.email,"role":login_payload.role })

   if check_login_presence == None :
       return JSONResponse(
            content={"message": "no user found for this role", "status": "failure"},
            status_code=400
        )
   # check for password 
   hashed_password_from_db = check_login_presence['password']

   validate_same_password = check_password(hashed_password_from_db , login_payload.password)
   if validate_same_password == False  :
        return JSONResponse(
            content={"message": "password mismatch", "status": "failure"},
            status_code=400
        )
       
   # regenerate access and refresh token 
   # create access token 
   generated_access_token = create_access_token({"email":login_payload.email,"role":login_payload.role})
   print(generated_access_token, "token ")
   if not  generated_access_token :
      return JSONResponse(
            content={"message": "error in generating access token", "status": "failure"},
            status_code=400
        )
     
   # create refresh token 
   generated_refresh_token = create_refresh_token({"email":login_payload.email,"role":login_payload.role})
   print(generated_refresh_token, "token ")
   if not  generated_refresh_token :
      return JSONResponse(
            content={"message": "error in generating refresh  token", "status": "failure"},
            status_code=400
        )
   ack_for_login = user_details_collection.update_one({"email":login_payload.email, "role":login_payload.role},{"$set":{"access_token":generated_access_token, "refresh_token":generated_refresh_token,"date_of_last_login":datetime.datetime.now().isoformat()}}) 
   if ack_for_login.modified_count ==1 :
       return JSONResponse(
            content={"message": "logged in successfully","access_token":generated_access_token,"refresh_token":generated_refresh_token ,"status": "success"},
            status_code=200
        )
   else:
       return JSONResponse(
            content={"message": "error in loggin-in" ,"status": "failure"},
            status_code=400
        )
   

async def forget_password_view( forget_password_payload: dict,background_tasks):
    # Check if email and role are present
    print(forget_password_payload.email)
    check_creds_presence = user_details_collection.find_one({
        "email": forget_password_payload.email,
        "role": forget_password_payload.role
    })

    if not check_creds_presence:
        return JSONResponse(
            content={"message": "No user found for this role", "status": "failure"},
            status_code=400
        )

   #  # Check if the token is expired
   #  forget_password_token = check_creds_presence.get('reset_password_token')
   #  if forget_password_token:
   #      response_from_token_validation = validate_token(forget_password_token)
   #      if not response_from_token_validation['valid']:
   #          return JSONResponse(
   #              content={"message": "Link has expired", "status": "failure"},
   #              status_code=400
   #          )

    # Check if the token has been used

   #  check_token_used = user_details_collection.find_one({
   #      "email": forget_password_payload.email,
   #      "role": forget_password_payload.role,
   #      "reset_password_token_expire": True
   #  })
   #  if check_token_used:
   #      return JSONResponse(
   #          content={"message": "Token has already been used", "status": "failure"},
   #          status_code=400
   #      )

    # Create a new token
    token_for_forget_password = create_forget_password_token({
        "email": forget_password_payload.email,
        "role": forget_password_payload.role
    })
    if not token_for_forget_password:
        return JSONResponse(
            content={"message": "Error creating forget password token", "status": "failure"},
            status_code=400
        )

    # Send the email in the background
   #  background_tasks.add_task(send_reset_password_email, token_for_forget_password, forget_password_payload.email, forget_password_payload.role)
    send_reset_password_email(token_for_forget_password, forget_password_payload.email, forget_password_payload.role)

    # Update the token details in the database
    update_forget_password_details = user_details_collection.update_one({
        "email": forget_password_payload.email,
        "role": forget_password_payload.role
    }, {
        "$set": {"reset_password_token": token_for_forget_password, "reset_password_token_expire": False}
    })

    if update_forget_password_details.modified_count == 1:
        return JSONResponse(
            content={"message": f"Link is generated to registered email {forget_password_payload.email}", "status": "success"},
            status_code=200
        )
    else:
        return JSONResponse(
            content={"message": "Error in forget password link generation", "status": "failure"},
            status_code=400
        )
    
def reset_password_view( forget_password_token, new_password ):
    

   forget_password_payload = validate_token(forget_password_token)
   print(forget_password_payload)
   if  not forget_password_payload['valid']:
       return JSONResponse(
            content={"message": "token has expired", "status": "failure"},
            status_code=400
        )
   



    # check email and role present 

   check_creds_presence = user_details_collection.find_one({"email":forget_password_payload['decoded_token']['email'],"role":forget_password_payload['decoded_token']['role'] })

   if check_creds_presence == None :
       return JSONResponse(
            content={"message": "no user found for this role", "status": "failure"},
            status_code=400
        )
   
   # check token expired or not 
   # forget_password_token = check_creds_presence['reset_password_token']

   if forget_password_token:
      response_from_token_validation = validate_token(forget_password_token)
      if  not response_from_token_validation['valid']:
         return JSONResponse(
               content={"message": "link has been expired", "status": "failure"},
               status_code=400
         )
      
   #check for token has used or not 

   check_token_used = user_details_collection.find_one({"email":forget_password_payload['decoded_token']['email'],"role":forget_password_payload['decoded_token']['role'] , "reset_password_token_expire":True })
   if check_token_used :
       return JSONResponse(
            content={"message": "Token has been used aldredy", "status": "failure"},
            status_code=400
        )
   
   # decode the new password 

   # hashing password 
   hashed_password = hash_password(new_password)
   if   not hash_password :

         return JSONResponse(
            content={"message": "error in hashing password", "status": "failure"},
            status_code=400
        )
   print("hashed ", hashed_password)
   update_password = user_details_collection.update_one({"email":forget_password_payload['decoded_token']['email'], "role":forget_password_payload['decoded_token']['role'], "reset_password_token":forget_password_token}, {"$set":{"reset_password_token_expire":True, "password":hashed_password }})
   if not  update_password .modified_count ==1 :
            return JSONResponse(
            content={"message": "errorsomething went wrong in updating new password in db", "status": "failure"},
            status_code=400
        )

   else:
        
    return JSONResponse(
                content={"message": "new password has been updated successfully", "status": "success"},
                status_code=200
            ) 
def delete_user_view(delete_request ):

    check_user= user_details_collection.find_one({"email":delete_request.email, "role":delete_request.role})
    if  not check_user:
         return JSONResponse(
            content={"message": "no user found for this role", "status": "failure"},
            status_code=400
        )
    ack_for_deleted = user_details_collection.delete_one({"email":delete_request.email, "role":delete_request.role})
    if ack_for_deleted.deleted_count ==1 :

             return JSONResponse(
            content={"message": "user deleted successfully", "status": "success"},
            status_code=200
        )
    else :
         return JSONResponse(
            content={"message": "user not deleted, try after sometime", "status": "failure"},
            status_code=400
        )