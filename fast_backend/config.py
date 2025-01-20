hostname = "127.0.0.1"
port = 8000
mongo_uri ='mongodb://localhost:27017'
db_name="domain_monitering"
user_details_coll = "user_details"
total_registered_database_coll = "total_registered_domains"
collected_who_is_data_coll= "scrapped_whois_data"
api_request_response_coll = "whois_api_logs"
auth_request_response_coll = "auth_api_logs"
user_subscription_coll = 'subscription_details'
register_score_coll="register_score"
montering_domain_list_coll= "domains_to_moniter"
montering_domain_expiry_list_coll="domains_expiry_to_moniter"
collected_whois_data_coll ="collected_whois_data"

secret_key='secret'
jwt_algorithm='HS256'
exp_time_for_access_token=1 
exp_time_for_refresh_token = 1
exp_time_for_reset_password_token = 5 
mail_sender_email ="whoisdomon@gmail.com"
mail_sender_password  ="asgs lkqx zxel jryy"
api_to_check_daily_registered = "https://domains-monitor.com/api/v1/f7720204c540922374a6270c9c3e9603/dailyupdate/json/"

