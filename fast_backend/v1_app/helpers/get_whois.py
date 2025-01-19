import whois
from .parse_whois_data import parse_whois_with_module

def get_whois_function(domain_name):
    try:
        # Retrieve WHOIS data
        original_whois_data = whois.whois(domain_name)
        
        # Initialize domain name variable
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
        return {"error": str(e)}
