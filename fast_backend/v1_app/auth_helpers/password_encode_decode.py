


import bcrypt

def hash_password(password: str) -> str:
    try :
            
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password
    except :
        return False 

def check_password(stored_hash: str, password: str) -> bool:
    
    return bcrypt.checkpw(password.encode('utf-8'), stored_hash)
