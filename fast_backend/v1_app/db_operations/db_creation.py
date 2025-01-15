from pymongo import MongoClient
import config 
from logger_setup.logger import get_logger 


logger = get_logger ('auth')

def establish_db_connection():

    connection = MongoClient(config.mongo_uri)
    domon_db = connection['domon']



