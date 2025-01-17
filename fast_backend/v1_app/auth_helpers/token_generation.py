import jwt
import datetime 
import config 
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from ..logger_setup.logger  import get_logger 

auth_logger = get_logger('auth_token')

def create_access_token(payload  ):
    try :
        auth_logger.info  (".....creating new token .....")  
        auth_logger.info(f"paylaod ---- {payload}")       
        encoded_jwt = jwt.encode({**payload ,"exp":datetime.datetime.utcnow() + datetime.timedelta(hours=config.exp_time_for_access_token) }, config.secret_key, algorithm=config.jwt_algorithm)
        return encoded_jwt
    except :
        return False 




def create_refresh_token(payload  ):
    try :
        auth_logger.info  (".....creating new token .....")  
        auth_logger.info(f"paylaod ---- {payload}")       
        encoded_jwt = jwt.encode({**payload ,"exp":datetime.datetime.utcnow() + datetime.timedelta(hours=config.exp_time_for_refresh_token) }, config.secret_key, algorithm=config.jwt_algorithm)
        return encoded_jwt
    except :
        return False 


    


def create_forget_password_token(payload  ):
    try :
        auth_logger.info  (".....creating new token .....")  
        auth_logger.info(f"paylaod ---- {payload}")       
        encoded_jwt = jwt.encode({**payload ,"exp":datetime.datetime.utcnow() + datetime.timedelta(minutes=config.exp_time_for_reset_password_token) }, config.secret_key, algorithm=config.jwt_algorithm)
        return encoded_jwt
    except :
        return False 
    



def validate_token(token):
    try:
        
        auth_logger.info(f"Validating token: {token}")
        decoded_token = jwt.decode(token, config.secret_key, algorithms=[config.jwt_algorithm])
        auth_logger.info(f"Decoded token: {decoded_token}")
        return {"valid": True, "decoded_token": decoded_token}
    except ExpiredSignatureError:
        auth_logger.error("Token has expired")
        return {"valid": False, "message": "Token has expired"}
    except InvalidTokenError:
        auth_logger.error("Invalid token")
        return {"valid": False, "message": "Invalid token"}
    except Exception as e:
        auth_logger.error(f"Error validating token: {e}")
        return {"valid": False, "message": str(e)}



