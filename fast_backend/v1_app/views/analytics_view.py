from ..db_operations.db_creation import collected_whois_data_coll

def get_analytics_view(selected_option, keyword_list, start_date, end_date, email, no_of_results, page_no):
    skip_limit = (page_no - 1) * no_of_results  # Fixed pagination calculation

    agg_query = []

    # Match filter
    match_filter = {}
    if selected_option and selected_option != "all":
        match_filter["schedule_type"] = {"$in": selected_option}
    if keyword_list:
        match_filter["keyword_used"] = {"$in": keyword_list}
    if start_date or end_date:
        date_conditions = []
        if start_date:
            date_conditions.append({"date_of_collection": {"$gte": start_date}})
        if end_date:
            date_conditions.append({"date_of_collection": {"$lte": end_date}})
        match_filter["$and"] = date_conditions
    if email:
        match_filter["email"] = email

    if match_filter:
        agg_query.append({"$match": match_filter})

    # Group by email and keyword_used
    agg_query.append({
        "$group": {
            "_id": {
                "email": "$email",
                "keyword_used": "$keyword_used",
            },
            "keyword_used": {"$first": "$keyword_used"},
            "email": {"$first": "$email"},
            "domain_name": {"$first": "$domain_name"},
            "whois_result": {"$push": "$whois_result"},
            "date_of_collection": {"$first": "$date_of_collection"},
            "schedule_type": {"$first": "$schedule_type"},
            "total_results": {"$sum": 1}  # Count occurrences
        }
    })

    # Get total count of documents
    agg_query.append({
        "$group": {
            "_id": None,  # FIXED: "_id": None needs quotes
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
        total_documents 
    }
    result = []
    for doc in analytics_data:
        doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
        result.append(doc)

    return result
