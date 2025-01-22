# from ..db_operations.db_creation import * 
from pymongo import MongoClient 
import sys
import os
import whois
from parse_whois_data import parse_whois_with_module
from time import sleep 
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
all_keywords_coll = db[config.montering_domain_list_coll]
collected_whois_data_coll = db[config.collected_whois_data_coll]
import dnstwist

def get_all_keywords_from_db():
     # get all keywords from db 
    list_of_keywords = list(all_keywords_coll.aggregate( config.get_all_keywords_from_db
      )

    )

    return list_of_keywords
def get_all_keywords_to_check_dns_twist():
    list_of_keywords = get_all_keywords_from_db()
    all_available_domains = [] 

    for each_keyword in list_of_keywords:
        keyword = each_keyword['domain']
        email = each_keyword['email']
        print(f"{keyword} --- {email}")
        
        
        try:
            domains = iterate_download_files_dns(keyword, email)
            print("Final domains:")
            # print(domains)
            all_available_domains.extend(domains)  # Append to the main list
        except Exception as e:

            print(f"An error occurred: {e}")
    
    return all_available_domains  # Return after the loop

def iterate_download_files_dns(keyword, email):

            domain_result =  dnstwist.run(domain=keyword, format='list')
            print(domain_result)
            result_per_keyword =[]
            for each_doc in domain_result:
                # print(each_doc['domain'])
                
                if each_doc['domain'].startswith('xn--'):
                    #  print(" starts wioth xl ")
                     continue 
                if True :
                    check_presence  = collected_whois_data_coll.find_one({"email":email  , "domain_name":each_doc['domain']})
                    if check_presence:
                         continue 

                
                    else:
                        result_per_keyword.append({"email":email,"domain_name":each_doc['domain'], "keyword":keyword})
            return result_per_keyword

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
        print(validated_whois_data)
        print(original_whois_data)
        # Return the validated WHOIS data
        return validated_whois_data

    except Exception as e:
        # Handle exceptions and return an error message
        print(e)
        return False 

def collect_insert_who_is(all_domains):
     
    for each_domain in all_domains:
        print(each_domain)

        collected_whois_data =get_whois_function (each_domain['domain_name'])
        if collected_whois_data:
            if collected_whois_data['domain_name']:
                    print(collected_whois_data)
                    schema_data = {"keyword_used":each_domain['keyword'], "email":each_domain['email'], "domain_name":each_domain['domain_name'], "whois_result":collected_whois_data,"date_of_collection":datetime.datetime.now().isoformat(),"schedule_type":"domain"}
                    verify_insertion = collected_whois_data_coll.insert_one(schema_data)
                    if verify_insertion:
                        print("data inserted successfully")
    return True 


def get_file_name(email):
     current_date = datetime.date.today().isoformat()
     current_date = current_date.replace('.', '_')
     email_for_file_name = email.replace('.','_').replace('@', '_')
     file_name = str(current_date)+'_'+str(email_for_file_name)
     print(file_name)
     return file_name
     

def group_data_by_client():
    print("sending report ")
    report_data_client_based = list(collected_whois_data_coll.aggregate(
         config.get_doc_for_report
)
     
     
    )
    print(report_data_client_based)
    pdf_file_name_list = []
     
    for each_email in report_data_client_based:
          client_email = each_email['_id']
          subject =config.subject_for_domain_report_send
          body =config.body_of_domain_report_send
          total_report_data = each_email['collected_domains']
    
          file_name = get_file_name (client_email )
          print(file_name)
          
          final_pdf_filename = generate_pdf(client_email,total_report_data, filename=f"./scheduled_domain_report/{file_name}")
          send_all_report_to_mail( final_pdf_filename , client_email ,subject , body  )
    return pdf_file_name_list

        
        

def send_all_report_to_mail(files_location, receiver_email, subject, body):
    print(receiver_email)
    # Sender email credentials
    sender_email = config.mail_sender_email
    password = config.mail_sender_password
    subject = "Scheduled Domain report Generation"
    body = "Hello ! sir/madam , we had some domains , that impersinate as like You's , kindly have a look obver it and take an action if neccessary! - DOMON TEAM"
    sender_email = config.mail_sender_email
    recipient_email = receiver_email
    sender_password =config.mail_sender_password
    smtp_server = 'smtp.gmail.com'
    smtp_port = 465
    path_to_file = files_location
    file_name = files_location.split('/')
    
    message = MIMEMultipart()
    message['Subject'] = subject
    message['From'] = sender_email
    message['To'] = recipient_email
    body_part = MIMEText(body)
    message.attach(body_part)

    with open(path_to_file,'rb') as file:
        message.attach(MIMEApplication(file.read(), Name=file_name[-1]))

    with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, message.as_string())     



# all_domains  = get_all_keywords_to_check_dns_twist()

# collect_insert_who_is(all_domains)

all_pdf_file_locatios = group_data_by_client()

print(all_pdf_file_locatios)



        

     