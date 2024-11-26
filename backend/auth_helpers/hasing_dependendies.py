import bcrypt 
import config 
from logger_configure.logger_setup import logger

def hash_password (password):
    logger.info(" hashingh password ")
    try :
        salt = bcrypt.gensalt(rounds = config.rounds)
        hashed_password = bcrypt.hashpw(password.encode(config.encode_algo),salt)
        logger.info(hashed_password)
        return hashed_password
    except Exception as e:
        logger.error(str(e))
        logger.critical(" error in hashing password ")
        return False


# hash_password("12345")


# hashed_password = b'$2b$19$793vSXX5DxoYDyqhwsgxPu9GuopJSA4Xa2xIto6fjjCt/20uTktwy'
def check_pasword(hashed_password, original_password ):
    try :
        return bcrypt.checkpw(original_password.encode(config.encode_algo), hashed_password)
    except Exception as e:
        return False

# print(check_pasword(hashed_password, '12345'))