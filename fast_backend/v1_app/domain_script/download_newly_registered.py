
import os 
import requests 
import json 
from datetime  import date , datetime
from ..db_operations.db_creation import  * 
import config 

def download_newly_registered_domain():
        try :
          full_date = "helo"
          file_path =  f"./files/daily_registered/hello.json"
          print(file_path)
          if not  os.path.exists(file_path):

            print("Downloading Daily Registered  Domain File")
            api=config.api_to_check_daily_registered
            response=requests.get(api)
            res=response.json()
            json_data=json.load=res
            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            with open(file_path,'w') as f2:
                json.dump( json_data,f2)

            # with open(file_path,'r') as json_data:
            #     json.dumps(json_data)
            try:
                if "domain" in json_data:
                    for domain in json_data["domain"]:
                       if not domain.startswith("xn--"):
                            data={"domain":domain,"date":full_date}   
                            print(data)    

                            if total_registered_database_coll.find_one(domain) is None:
                                   
                                    ins = total_registered_database_coll.insert_one(data)
                                    if ins.inserted_id ==1:
                                         print(" inserted successfully")
                                    
                print("Daily Data Updated Succesfully in 4.5 GB File ")       
                return True    
            except Exception as e:
                print("Cannot insert the daily redistered domain in 4.5 GB File ")
                print(e)
                return False
        except Exception as e:
            print(e)


            