


# from  ..domain_script.download_newly_registered  import download_newly_registered_domain
from datetime import datetime
from ..db_operations.db_creation import *
from fastapi.responses import JSONResponse


'''
db.domains_to_moniter.updateOne(
    {
        "email": "nandhakumarselva2000@gmail.com",
        "schedule_list.domain_name": "qqqq",
        "schedule_list.scedule_history.domain_name": "qq"
    },
    {
        "$push": {
            "schedule_list.$[list].scedule_history.$[history].new_field": {
                "new_key": "new_value",
                "another_key": "another_value"
            }
        }
    },
    {
        "arrayFilters": [
            { "list.domain_name": "qqqq" },
            { "history.domain_name": "qq" }
        ]
    }
)
moniter_domain_expiry_keyword_coll
'''

def scedule_domain_expiry_view(email , domain_name):
    '''
    response_from_downlaod = download_newly_registered_domain()
    if response_from_downlaod:
        print("true " )
    else:
         print(" false")
    '''
    check_existance =  moniter_domain_expiry_keyword_coll.find_one({"email":email,"schedule_list.domain_name":domain_name})
    if check_existance :
        return JSONResponse(
                content={"message": f"domain -{domain_name } is aldredy sceduled for monitoring" , "data":{"domain_name":domain_name ,"active":True,  "date_of_sceduled":datetime.now().isoformat()},"status": "success"},
                status_code=200
            )
    
    check_presence=  moniter_domain_expiry_keyword_coll.find_one({"email":email,"schedule_list.domain_name":domain_name})
    if check_presence :
        return JSONResponse(
                content={"message": f"domain -{domain_name } is aldredy sceduled for monitoring" , "data":{"domain_name":domain_name ,"active":True,  "date_of_sceduled":datetime.now().isoformat()},"status": "success"},
                status_code=200
            )
    

    verification_of_data_insert = moniter_domain_expiry_keyword_coll.update_one(
    {"email": email},
    {
        "$push": {
            "schedule_list": {
                "domain_name": domain_name,
                "active": True,
                "date_of_scheduled": datetime.now().isoformat(), 
             "date_of_last_updated":"" ,
             "first_run":True , 
             "expire_date":"", 
             "next_alert_message_date":"", 
             "turn_off_notification":False
            
                
                }
        }
    },
    upsert=True  
)

    if verification_of_data_insert:
        return JSONResponse(
                content={"message": f"domain -{domain_name } is sceduled for monitoring" ,"status": "success"},
                status_code=200
            )


    



def update_domain_expiry_view(email , domain_name, new_domain_name ):
    qwery= {"email":email,"schedule_list.domain_name":domain_name}
    print(qwery)
    check_domain_presence   = moniter_domain_expiry_keyword_coll.find_one(qwery)
    if check_domain_presence ==None :
        return JSONResponse(
                content={"message": f"No data Found" ,"status": "failure"},
                status_code=400
            )
    

    verify_updated =     moniter_domain_expiry_keyword_coll.update_one({"email":email , "schedule_list.domain_name":domain_name},{"$set":{"schedule_list.$.domain_name":new_domain_name,"schedule_list.$.first_run":True , "schedule_list.$.date_of_last_updated":datetime.now().isoformat()}}, upsert=True)

    if verify_updated.modified_count==1:
          return JSONResponse(
                content={"message": f"old domain name updated successfully" ,"status": "success"},
                status_code=200
            )


    else:
        return JSONResponse(
                content={"message": f"domain not updated ! try later" ,"status": "failure"},
                status_code=400
            )


def delete_domain_expiry_view(email , domain_name):
    
    qwery= {"email":email,"schedule_list.domain_name":domain_name}
    print(qwery)
    check_domain_presence   = moniter_domain_expiry_keyword_coll.find_one(qwery)
    if check_domain_presence ==None :
        return JSONResponse(
                content={"message": f"No data Found" ,"status": "failure"},
                status_code=400
            )
    
    verify_deleted =     moniter_domain_expiry_keyword_coll.update_one ({"email":email , "schedule_list.domain_name":domain_name},{"$pull":{"schedule_list":{"domain_name":domain_name}}})


    if verify_deleted.modified_count==1:
          return JSONResponse(
                content={"message": f" domain name deleted successfully" ,"status": "success"},
                status_code=200
            )
    



    else:
        return JSONResponse(
                content={"message": f"domain not deleted ! try later" ,"status": "failure"},
                status_code=400
            )




def pause_domain_expiry_view(email , domain_name):
    
    qwery= {"email":email,"schedule_list.domain_name":domain_name}
    print(qwery)
    check_domain_presence   = moniter_domain_expiry_keyword_coll.find_one(qwery)
    if check_domain_presence ==None :
        return JSONResponse(
                content={"message": f"No data Found" ,"status": "failure"},
                status_code=400
            )
    
    verify_deleted =     moniter_domain_expiry_keyword_coll.update_one ({"email":email , "schedule_list.domain_name":domain_name},{"$set":{"schedule_list.$.active":False}})


    if verify_deleted.modified_count==1:
          return JSONResponse(
                content={"message": f" domain name paused successfully" ,"status": "success"},
                status_code=200
            )


    else:
        return JSONResponse(
                content={"message": f"domain not paused ! try later" ,"status": "failure"},
                status_code=400
            )