# from ..db_operations.db_creation import * 
from pymongo import MongoClient 
import sys
import os
import whois
from time import sleep 
from parse_whois_data import parse_whois_with_module
from generate_report import generate_pdf
import config 
import datetime


import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.application import MIMEApplication
from email import encoders
import os




conn = MongoClient(config.mongo_uri)
db = conn[config.db_name]
domain_expiry_keywords = db[config.montering_domain_expiry_list_coll]
collected_whois_data_coll = db[config.collected_whois_data_coll]
import dnstwist

def get_new_domains_from_db():
     # get all keywords from db 
    list_of_keywords = list(domain_expiry_keywords.aggregate( config.get_moniter_expire_domains
      )

    )

    return list_of_keywords
def check_update_expiration_date(domains_to_check):
    for each_doc in domains_to_check:
        domain_name= each_doc['domain_name']
        email = each_doc['email']
        collected_whois_data = get_whois_function(domain_name)
        if collected_whois_data:
            if collected_whois_data['domain_name']:

                    

                expiration_date = collected_whois_data['expiration_date']
                expiry_in_whois = collected_whois_data['expiration_date'] 
                date_1 = datetime.datetime.strptime(expiry_in_whois,"%Y-%m-%d %H:%M:%S")
                time_to_alarm = date_1 - datetime.timedelta(days=60)
                print(time_to_alarm,"alarm date")
                schema_data = { "email":email, "domain_name":collected_whois_data['domain_name'], "whois_result":collected_whois_data,"date_of_collection":datetime.datetime.now().isoformat() , "schedule_type":"domain_expiry", "expiry_date":collected_whois_data['expiration_date']}
                verify_insertion = collected_whois_data_coll.insert_one(schema_data)
                if verify_insertion:
                    # update in original 
                    domain_expiry_keywords.update_one({"email":email, "schedule_list.domain_name":domain_name}, {"$set":{"schedule_list.$.expire_date":expiration_date, "schedule_list.$.next_alert_message_date":time_to_alarm,"schedule_list.$.first_run":False}})

                        
                print(expiration_date)

    
    




def get_whois_function(domain_name):
    print(" getting whois ")
    try:
        # Retrieve WHOIS data
        original_whois_data = whois.whois(domain_name)
        print(domain_name)
        d_name = ""
        # Check if 'domain_name' exists in the original_whois_data and process it
        if original_whois_data.get('domain_name'):
            if isinstance(original_whois_data['domain_name'], str):
                d_name = original_whois_data['domain_name'].lower()
            elif isinstance(original_whois_data['domain_name'], list):
                d_name = original_whois_data['domain_name'][0].lower()

        # Call parse_whois_with_module with the retrieved data
        validated_whois_data = parse_whois_with_module(original_whois_data,d_name)
        return validated_whois_data

    except Exception as e:
        # Handle exceptions and return an error message
        print(e)
        return False 



def  check_and_send_alarm():
        report_data  = list(domain_expiry_keywords.aggregate(config.send_report_periodically))
        for each_data  in report_data:
            print(each_data)
            
            send_all_report_to_mail(each_data ,each_data['_id'], "", "")





def get_file_name(email):
     current_date = datetime.date.today().isoformat()
     current_date = current_date.replace('.', '_')
     email_for_file_name = email.replace('.','_').replace('@', '_')
     file_name = str(current_date)+'_'+str(email_for_file_name)
     print(file_name)
     return file_name
     
        
        

def send_all_report_to_mail(data, receiver_email, subject, body):
    print(receiver_email)
    # Sender email credentials
    sender_email = config.mail_sender_email
    password = config.mail_sender_password
    subject = "Scheduled Domain expiry report Generation"
    body = "Hello ! sir/madam , we had some domains  which are going to expire, kindly have a look obver it and take an action if neccessary! - DOMON TEAM"
    recipient_email = receiver_email
    smtp_server = 'smtp.gmail.com'
    smtp_port = 465

    # Create a text-only email
    message = MIMEMultipart('alternative')
    message['Subject'] = subject
    message['From'] = sender_email
    message['To'] = recipient_email

    # Create text content
    text_content = body  # Your basic text content

    # If you want to include formatted content like a list of domains, add it to the body
    # For example:
    text_content += "\n\nExpiring Domains:\n"
    for each_domians in data['total_domains']:
        text_content +=  f" domain name - {each_domians['domain_name']} expire date of domain  - {each_domians['expiry_date'] } date of sceduled for monitoring - {each_domians['date_of_sceduled']} \n " 
   
    # Attach the text content
    text_part = MIMEText(text_content, 'plain')
    message.attach(text_part)

    # Send the email
    with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, recipient_email, message.as_string())

# total_new_domains = get_new_domains_from_db()
# print(total_new_domains)

# check_update_expiration_date(total_new_domains)



check_and_send_alarm()

# check_whois_expiry_date(all_domains)

# all_pdf_file_locatios = group_data_by_client()

# print(all_pdf_file_locatios)


