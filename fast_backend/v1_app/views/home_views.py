from fastapi.responses import JSONResponse
import whois
from datetime import datetime
from ..helpers.get_whois import get_whois_function
from ..helpers . get_mx_record import get_mx_record
from ..helpers.get_register_score import get_malicious_score

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




