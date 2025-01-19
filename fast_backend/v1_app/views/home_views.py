from fastapi.responses import JSONResponse
import whois
from datetime import datetime
from ..helpers.get_whois import get_whois_function
from ..helpers . get_mx_record import get_mx_record
from ..helpers.get_register_score import get_register_score
from ..helpers.dns_lookup import get_dns_records
from ..helpers.get_ip_of_domain import get_ip_address_of_domain 


def get_whois_view(domain_name: str):
    try:
        whois_result = get_whois_function(domain_name)

        if whois_result.get('domain_name') is None:
            print(" domain name is none  ")
            return JSONResponse(
                content={"message": "Domain Details Not Found", "status": "failure"},
                status_code=400
            )
        else:
            return JSONResponse(
                content={"message": "whois data fetched successfully","result":whois_result, "status": "success"},
                status_code=200
            )
        
        
        
    except Exception as e:
        return JSONResponse(
            content={"message": "An error occurred while fetching domain details", "status": "failure", "error": str(e)},
            status_code=500
        )



def dns_lookup_view(domain_name):
    try:
        dns_lookup  = get_dns_records(domain_name)
        print(" dns lookup ", dns_lookup)

        return JSONResponse(
                content={"message": "dns lookup fetched successfully","result":dns_lookup, "status": "success"},
                status_code=200
            )  
        
    except Exception as e:
        return JSONResponse(
            content={"message": "An error occurred while fetching domain details", "status": "failure", "error": str(e)},
            status_code=500
        )



def get_ip_view(domain_name):
        ip = get_ip_address_of_domain(domain_name)
        print(ip)
        return JSONResponse(
                content={"message": "ip fetched successfully","result":ip, "status": "success"},
                status_code=200
            )
        



def get_mx_record_view(domain_name):

    mx_record = get_mx_record(domain_name)
    print(mx_record)
    return JSONResponse(
                content={"message": "mx record fetched successfully","result":mx_record, "status": "success"},
                status_code=200
            )

def register_Score_view(domain_name):
    whois_data = get_whois_function(domain_name)
    print(whois_data['registrar'])
    register_score = get_register_score(whois_data['registrar'])
    return JSONResponse(
                content={"message": "register score fetched successfully","result":register_score, "status": "success"},
                status_code=200
            )
