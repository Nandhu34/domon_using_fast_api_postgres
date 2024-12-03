from flask import request 
from auth_helpers.token_based_dependendies import  decode_token_data

def get_auth_and_decode_data():
    print( "get auth anfd get the token data ")
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        raise ValueError("Authorization header is missing.")
    
    token = auth_header.split(' ')[1]

    print(token,"token - from thedecoded ")
    decoded_value =decode_token_data(token)
    print("decodevaluefrom headers ",decoded_value)
    return decoded_value 