
# from  ..domain_script.download_newly_registered  import download_newly_registered_domain
# from ..domain_script.domain_imperation_process import *
from datetime import datetime
from ..db_operations.db_creation import *
from fastapi.responses import JSONResponse
import json 
from bson import json_util
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

'''

def scedule_domain_view(email , domain_name):
    '''
    response_from_downlaod = download_newly_registered_domain()
    if response_from_downlaod:
        print("true " )
    else:
         print(" false")
    '''
    check_existance =  moniter_domain_keyword_coll.find_one({"email":email,"schedule_list.domain_name":domain_name})
    if check_existance :
        return JSONResponse(
                content={"message": f"domain -{domain_name } is aldredy sceduled for monitoring" , "data":{"domain_name":domain_name ,"active":True,  "date_of_sceduled":datetime.now().isoformat()},"status": "success"},
                status_code=200
            )

    verification_of_data_insert = moniter_domain_keyword_coll.update_one(
    {"email": email, "role":"user"},
    {
        "$push": {
            "schedule_list": {
                "domain_name": domain_name,
                "active": True,
                "date_of_scheduled": datetime.now().isoformat(), 
             "date_of_last_updated":"" 
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


    



def update_domain_view(email , domain_name, new_domain_name ):
    qwery= {"email":email,"schedule_list.domain_name":domain_name}
    print(qwery)
    check_domain_presence   = moniter_domain_keyword_coll.find_one(qwery)
    if check_domain_presence ==None :
        return JSONResponse(
                content={"message": f"No data Found" ,"status": "failure"},
                status_code=400
            )
    

    verify_updated =     moniter_domain_keyword_coll.update_one({"email":email , "schedule_list.domain_name":domain_name},{"$set":{"schedule_list.$.domain_name":new_domain_name, "schedule_list.$.date_of_last_updated":datetime.now().isoformat()}}, upsert=True)

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


def delete_domain_view(email , domain_name):
    
    qwery= {"email":email,"schedule_list.domain_name":domain_name}
    print(qwery)
    check_domain_presence   = moniter_domain_keyword_coll.find_one(qwery)
    if check_domain_presence ==None :
        return JSONResponse(
                content={"message": f"No data Found" ,"status": "failure"},
                status_code=400
            )
    
    verify_deleted =     moniter_domain_keyword_coll.update_one ({"email":email , "schedule_list.domain_name":domain_name},{"$pull":{"schedule_list":{"domain_name":domain_name}}})


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




def pause_domain_view(email , domain_name):

        # return (get_all_keywords_to_check_dns_twist())  


    qwery= {"email":email,"schedule_list.domain_name":domain_name}
    print(qwery)
    check_domain_presence   = moniter_domain_keyword_coll.find_one(qwery)
    if check_domain_presence ==None :
        return JSONResponse(
                content={"message": f"No data Found" ,"status": "failure"},
                status_code=400
            )

    verify_deleted =     moniter_domain_keyword_coll.update_one({"email":email , "schedule_list.domain_name":domain_name},{"$set":{"schedule_list.$.active":False}})

    print(verify_deleted)
    if verify_deleted:
            return JSONResponse(
                content={"message": f" domain name paused successfully" ,"status": "success"},
                status_code=200
            )


    else:
        return JSONResponse(
                content={"message": f"domain not paused ! try later" ,"status": "failure"},
                status_code=400
            )


def unpause_domain_view(email , domain_name):

        # return (get_all_keywords_to_check_dns_twist())  


    qwery= {"email":email,"schedule_list.domain_name":domain_name}
    print(qwery)
    check_domain_presence   = moniter_domain_keyword_coll.find_one(qwery)
    if check_domain_presence ==None :
        return JSONResponse(
                content={"message": f"No data Found" ,"status": "failure"},
                status_code=400
            )

    verify_deleted =     moniter_domain_keyword_coll.update_one({"email":email , "schedule_list.domain_name":domain_name},{"$set":{"schedule_list.$.active":True}})

    print(verify_deleted)
    if verify_deleted:
            return JSONResponse(
                content={"message": f" domain name unpaused successfully" ,"status": "success"},
                status_code=200
            )


    else:
        return JSONResponse(
                content={"message": f"domain not unpaused ! try later" ,"status": "failure"},
                status_code=400
            )




def get_sceduled_domains_view(page_no, no_of_results, email):
        role="user"
        # print(email, "klniho")

        user_found = user_details_collection.find_one({"email":email, "role":role})
        print(user_found)
        if  not user_found:
             return JSONResponse(
               
               content={"data":'user not found'},
                 status_code=400
            ) 
        offset = (page_no - 1) * no_of_results
        print(offset,"offff", page_no -1)

        aggregate_query =[
    {
        '$match': {
            'email': email
        }
    }, {
        '$project': {
            'total_result': {
                '$size': '$schedule_list'
            }, 
            'data': '$schedule_list', 
            'email': '$email'
        }
    }, {
        '$unwind': {
            'path': '$data'
        }
    }, {
        '$skip': offset
    }, {
        '$limit': no_of_results
    }, {
        '$group': {
            '_id': '$_id', 
            'email': {
                '$first': '$email'
            }, 
            'total_result': {
                '$first': '$total_result'
            }, 
            'result': {
                '$push': '$data'
            }
        }
    }
]
       
        print(aggregate_query , " agggggg")
        res_data =list( moniter_domain_keyword_coll.aggregate(aggregate_query))
        print(res_data)
        if res_data ==[]:
             paggination ={
             "no_of_results_per_page" : no_of_results,
             "total_results" :res_data[0]['total_result']  , 
             "has_preview_page":True if int(page_no) >=2 else False     , 
             "has_next_page": False  ,    
             "current_page":page_no        }
             response_data = {'paggination':paggination,'data':res_data}
             json_response = json_util.dumps(response_data)

        # Return as a proper JSON response
             return JSONResponse(
                content=json.loads(json_response),  # Converts the BSON-serialized string back into JSON
            status_code=200
        )


        print(res_data[0]['result'])
        print(len(res_data[0]['result']),"oo")
        print(page_no)
        print(no_of_results * page_no )
        print(res_data[0]['total_result'])
        res_data[0]['type']='expiry'
        paggination ={
             "no_of_results_per_page" : no_of_results,
             "total_results" :res_data[0]['total_result']  , 
             "has_preview_page":True if int(page_no) >=2 else False     , 
             "has_next_page":True if no_of_results * page_no < res_data[0]['total_result'] else False  ,    
             "current_page":page_no

        }

        print(paggination)

        
        response_data = {
    "pagination": paggination,
    "data": res_data
}

        # Use bson.json_util.dumps() to handle ObjectId, datetime, etc.
        json_response = json_util.dumps(response_data)

        # Return as a proper JSON response
        return JSONResponse(
            content=json.loads(json_response),  # Converts the BSON-serialized string back into JSON
            status_code=200
        )