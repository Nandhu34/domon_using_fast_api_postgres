from ..db_operations.db_creation import collected_whois_data_coll
from fastapi.responses import JSONResponse
from datetime import datetime , timezone
def get_analytics_view(selected_option, keyword_list, start_date, end_date, email, no_of_results, page_no):
    skip_limit = (page_no - 1) * no_of_results  # Fixed pagination calculation
    print(selected_option)
    agg_query = []
    print(keyword_list , "presner")

    # Match filter conditions
    match_conditions = []

    if selected_option:
        print(selected_option)
        match_conditions.append({"schedule_type": {"$in": selected_option}})

    if keyword_list:
        print(" keyword list presner ")
        match_conditions.append({"keyword_used": {"$in": keyword_list}})

    if start_date or end_date:
        date_conditions = []
        if start_date:
            date_conditions.append({"date_of_collection": {"$gte": start_date}})
        if end_date:
            date_conditions.append({"date_of_collection": {"$lte": end_date}})
        # Ensure date conditions are part of $and
        if date_conditions:
            match_conditions.append({"$and": date_conditions})

    if email:
        match_conditions.append({"email": email})

    # Only add $match if there are conditions
    if match_conditions:
        agg_query.append({"$match": {"$and": match_conditions}})

    # Group by email and keyword_used
    agg_query.append({
        "$group": {
            "_id": {
                "email": "$email",
                "keyword_used": "$keyword_used",
                "schedule_type": "$schedule_type"
            },
            "keyword_used": {"$first": "$keyword_used"},
            "email": {"$first": "$email"},
            "domain_name": {"$first": "$domain_name"},
            'whois_result': {
                '$push': {
                    '$mergeObjects': [
                        '$whois_result', {
                            'date_of_collection': '$date_of_collection'
                        }
                    ]
                }
            }, "date_of_collection": {"$first": "$date_of_collection"},
            "schedule_type": {"$first": "$schedule_type"},
            "total_results": {"$sum": 1}  # Count occurrences
        }
    })

    # Get total count of documents
    agg_query.append({
        "$group": {
            "_id": None,
            "data": {"$push": "$$ROOT"},
            "total_documents": {"$sum": "$total_results"}  # Sum total results
        }
    })

    # Unwind `data` array
    agg_query.append({"$unwind": "$data"})

    # Add total document count to each record
    agg_query.append({
        "$addFields": {
            "data.total_documents": "$total_documents"
        }
    })

    # Replace root with `data`
    agg_query.append({"$replaceRoot": {"newRoot": "$data"}})

    # Pagination
    agg_query.append({"$skip": skip_limit})
    agg_query.append({"$limit": no_of_results})

    print("Generated Aggregation Query:", agg_query)  # Debugging

    # Execute aggregation
    analytics_data = collected_whois_data_coll.aggregate(agg_query)
    pagginationn ={
        # total_documents 
    }
    result = []
    for doc in analytics_data:
        doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
        result.append(doc)

    return result

def get_all_keywords_view(email):
    # return "hihi"
    agg_qwery=[
    {
        '$match': {
            'email': email
        }
    }, {
        '$group': {
            '_id': {
                'email': '$email'
            }, 
            'total_keywords': {
                '$addToSet': '$keyword_used'
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'total_keywords': 1
        }
    }

]

    result = list(collected_whois_data_coll.aggregate(agg_qwery))
    print(result )
    options = []
    for i in result[0]['total_keywords'] :
            temp_option={}
            temp_option = {"name":i , "code":i }
            options.append(temp_option)
    print(", ".join(map(str, options)))
    print(options )
    return options


def get_chart_view(email):
    aggregate_qwery= [
    {
        '$match': {
            'email': email, 
            'schedule_type': 'domain'
        }
    }, {
        '$group': {
            '_id': '$keyword_used', 
            'total': {
                '$addToSet': '$domain_name'
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'keyword': '$_id', 
            'result_count': {
                '$size': '$total'
            }
        }
    }
]
    result = list(collected_whois_data_coll.aggregate(aggregate_qwery))
    modified_payload =[]

    if len(result)>0:
        for i in result:
            temp_array =[i['keyword'],i['result_count']]
            modified_payload .append(temp_array)
        # print(modified_payload)

        return JSONResponse(
            content={"result":modified_payload, "status": "success"},
            status_code=200
        )
    else:
          return JSONResponse(
            content={"result":[], "status": "failure"},
            status_code=200
        )





def get_domain_expiry_view(email):



    aggregate_qwery=[
    {
        '$match': {
            'email': 'nandhakumarselva2000@gmail.com'
        }
    }, {
        '$project': {
            'domain_name': 1, 
            'expiry_date': '$whois_result.expiration_date'
        }
    }, {
        '$addFields': {
            'expiry_date': {
                '$dateFromString': {
                    'dateString': '$expiry_date', 
                    'format': '%Y-%m-%d %H:%M:%S', 
                    'onError': datetime(1970, 1, 1, 0, 0, 0, tzinfo=timezone.utc), 
                    'onNull': datetime(1970, 1, 1, 0, 0, 0, tzinfo=timezone.utc)
                }
            }
        }
    }, {
        '$addFields': {
            'days_until_expiry': {
                '$divide': [
                    {
                        '$subtract': [
                            '$expiry_date', datetime.utcnow()
                        ]
                    }, 1000 * 60 * 60 * 24
                ]
            }
        }
    }, {
        '$bucket': {
            'groupBy': '$days_until_expiry', 
            'boundaries': [
                0, 5, 10, 20, 30, 60, 90, 180, 365, 10000
            ], 
            'default': 'Other', 
            'output': {
                'domain_names': {
                    '$push': '$domain_name'
                }, 
                'count': {
                    '$sum': 1
                }
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'expiry_range': '$_id', 
            'domain_names': 1, 
            'count': 1
        }
    }
]
    result = list(collected_whois_data_coll.aggregate(aggregate_qwery))
    if len(result)>0:
        return JSONResponse(
            content={"result":result, "status": "success"},
            status_code=200
        )
    else:
          return JSONResponse(
            content={"result":result, "status": "failure"},
            status_code=200
        )



def get_impersination_chart_view(email):
    aggregate_qwery=[
    {
        '$match': {
            'email': email
        }
    }, {
        '$group': {
            '_id': '$keyword_used', 
            'count': {
                '$sum': 1
            }, 
            'domain_list': {
                '$addToSet': '$domain_name'
            }, 
            'keyword_used': {
                '$first': '$keyword_used'
            }
        }
    }
]
    result = list(collected_whois_data_coll.aggregate(aggregate_qwery))
    if len(result)>0:
        return JSONResponse(
            content={"result":result, "status": "success"},
            status_code=200
        )
    else:
          return JSONResponse(
            content={"result":result, "status": "failure"},
            status_code=200
        )




# def get_domain_founded_day_chart_view(email):
#     aggregate_qwery=
#     result = list(collected_whois_data_coll.aggregate(aggregate_qwery))
#     if result.length>0:
#         return JSONResponse(
#             content={"result":result, "status": "success"},
#             status_code=200
#         )
#     else:
#           return JSONResponse(
#             content={"result":result, "status": "failure"},
#             status_code=200
#         )
