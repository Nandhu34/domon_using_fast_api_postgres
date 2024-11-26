import jwt 
import datetime
import os
import config
from logger_configure.logger_setup import logger





# payload = {"email":"sample@email.com", "role":"user","password":"1234567890"}
# expiration = datetime.datetime.now()+datetime.timedelta(minutes=config.access_token_expiration_time)
# generated_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbXBsZUBlbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2Nzg5MCIsImV4cCI6MTczMjYwNTA0Mn0.JjFt9wtRivRweIYR3sOUkARrPmgsE32a9ktbEpf4y5U"

def create_new_jwt_token( payload , expiration_time ):
    print(payload , expiration_time)
 

    logger.info("generating token ")
    logger.info(f"payload - {payload}")
    logger.info(f"expiration time - {expiration_time}")
   
    try:
        
        payload['exp'] = int(expiration_time.timestamp())
        print("exp --><", expiration_time)
        jwt_token = jwt.encode(payload, config.jwt_secret, algorithm=config.jwt_algorithm)
        
        logger.info(f"Generated JWT token: {jwt_token}")
        return jwt_token
    except Exception as e:
          logger.critical("error at creating token")
          logger.error(f"error : {str(e)}")
          return False 
    
def decode_token_data(token):
    logger.info(" decoding token data ")
    try :
        jwt_body = jwt.decode(token , config.jwt_secret , algorithms= config.jwt_algorithm)
        logger.info(jwt_body)
        return jwt_body
    except Exception as e:
        logger.critical(" error at decoding token")
        logger.error(f"error : {str(e)}")
        return False 

def check_token_expired(token):
    logger.info(" checking token expired ot not ")
    try:
        decoded_token = jwt.decode(token, config.jwt_secret, algorithms= config.jwt_algorithm,options={"verify_exp": False} )
        expiration_time = decoded_token.get('exp')

        logger.info(f"expiration time - {expiration_time}")
        if expiration_time:
            current_time = datetime.datetime.now()
            logger.info(f" current time - {current_time}")
            expiration_datetime = datetime.datetime.fromtimestamp(expiration_time)
            print("c uurent ", current_time)
            print(expiration_datetime)
            if current_time > expiration_datetime :
                logger.info("token has been expired ")
                return True 
            else :
                logger.info(" token is not expired ")
                return False
        else:
            logger.info(" token  is not expired ")
            return False
    
    except jwt.ExpiredSignatureError:
        logger.info(" token  is  expired ")
        return True
    except jwt.InvalidTokenError:
        logger.info(" token  is not expired ")
        return False   
    
def get_expiration_time(duration , duration_type ):
    try:
        print(datetime.datetime.now())
        print(datetime.timedelta(minutes=duration))
        if duration_type == "minute":
            return datetime.datetime.now() + datetime.timedelta(minutes=duration)
        elif duration_type == "hour":
            return datetime.datetime.now() + datetime.timedelta(hours=duration)
        elif duration_type == "day":
            return datetime.datetime.now() + datetime.timedelta(days=duration)
        else:
            raise ValueError("Invalid duration type. Use 'minute', 'hour', or 'day'.")
    except Exception as e:
        logger.error(f"Error in get_expiration_time: {str(e)}")
        return False
         
        #  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmRoYWt1bWFyc2VsdmEyMDAwQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzMyNjQwOTAxfQ.wenVsFOoD1J6AdzfzDftB8Yt1W_ckyLE9vBWALPUV9E
    
# print(check_token_expired('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmRoYWt1bWFyc2VsdmEyMDAwQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzMyNjIxODI0fQ.evZXt4TyO6XudjfttysdBPR1wLGc5NAc0nwaV8cCh0k'))         
# print(get_expiration_time(3, "minute")  )

# currently_generated = create_new_jwt_token(payload, expiration)
# decoded_value = decode_token_data(currently_generated)
# is_token_expired = check_token_expired(currently_generated)

# print(" cuurently generated - ", currently_generated )
# print(" decpoded data ", decoded_value)
# print(" is toekn expired ", is_token_expired)