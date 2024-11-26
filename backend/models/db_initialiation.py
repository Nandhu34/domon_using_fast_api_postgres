import config
from pymongo import MongoClient

mongo_connection = MongoClient(config.mongo_connection_url)
database_connection = mongo_connection[config.database_name]
user_details_collection =  database_connection[config.user_details_collection]
served_whois_data_collection =database_connection[config.served_whois_data_collection]
total_registered_domains_collection = database_connection[config.total_registered_domains_collection]
subscription_details_collection = database_connection[config.subscription_details_collection]






