hostname = "127.0.0.1"
port = 8000
#mongo_uri="mongodb://localhost:27017/"
#mongo_uri ='mongodb://mongo:unIzHWKNaHdsYQHIAWiatOsYBODcETaF@autorack.proxy.rlwy.net:42724'
mongo_uri = 'mongodb://mongo:IBbBPQjCAbvEZSIDmepskjqdIoDHYIpE@hopper.proxy.rlwy.net:37985'
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
frontend_url= "https://domonfrontend-production.up.railway.app"



get_moniter_expire_domains = [
    {
        '$unwind': {
            'path': '$schedule_list'
        }
    }, {
        '$match': {
            'schedule_list.first_run': True
        }
    }, {
        '$project': {
            'email': 1, 
            'domain_name': '$schedule_list.domain_name'
        }
    }
]



send_report_periodically = [
    {
        '$unwind': {
            'path': '$schedule_list'
        }
    }, {
        '$match': {
            '$expr': {
                '$gte': [
                    '$schedule_list.next_alert_message_date', '$$NOW'
                ]
            }, 
            'schedule_list.turn_off_notification': False
        }
    }, {
        '$project': {
            'email': 1, 
            'domain_name': '$schedule_list.domain_name', 
            'date_of_sceduled': '$schedule_list.date_of_scheduled', 
            'expiry_date': '$schedule_list.expire_date'
        }
    }, {
        '$group': {
            '_id': '$email', 
            'total_domains': {
                '$push': {
                    'domain_name': '$domain_name', 
                    'date_of_sceduled': '$date_of_sceduled', 
                    'expiry_date': '$expiry_date'
                }
            }, 
            'email': {
                '$first': '$email'
            }
        }
    }
]


subject_for_domain_report_send = "report generation ! " 
body_of_domain_report_send = "here the pdf file that contains total domains founded today!"




get_all_keywords_from_db = [
    {
        '$unwind': {
            'path': '$schedule_list'
        }
    }, {
        '$match': {
            'schedule_list.active': True
        }
    }, {
        '$unwind': {
            'path': '$schedule_list'
        }
    }, {
        '$project': {
            'email': 1, 
            'domain': '$schedule_list.domain_name'
        }
    }
]



get_doc_for_report = [
    {
        '$match': {
            'date_of_collection': {
                '$gte': '2025-01-21T11:27:31.228081'
            }
        }
    }, {
        '$group': {
            '_id': '$email', 
            'collected_domains': {
                '$push': {
                    'domain_name': '$domain_name', 
                    'used_keyword': '$keyword_used', 
                    'whois_result': '$whois_result', 
                    'date_of_collection': '$date_of_collection'
                }
            }
        }
    }
]


subject_for_domain_report_send = "report generation ! " 
body_of_domain_report_send = "here the pdf file that contains total domains founded today!"