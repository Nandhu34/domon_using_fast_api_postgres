from pymongo import MongoClient
import config 
from ..logger_setup.logger import get_logger 


logger = get_logger ('auth')

try :
    connection = MongoClient(config.mongo_uri)
    domon_db = connection[config.db_name]
    user_details_collection = domon_db [config.user_details_coll]
    total_registered_database_coll = domon_db [config.total_registered_database_coll]
    collected_who_is_data_coll= domon_db [config.collected_who_is_data_coll]
    api_request_response_coll = domon_db [config.api_request_response_coll]    
    auth_request_response_coll = domon_db [config.auth_request_response_coll]
    user_subscription_coll = domon_db [config.user_subscription_coll]


except Exception as e:
    
    logger.error("error in mongo connection ")

    
