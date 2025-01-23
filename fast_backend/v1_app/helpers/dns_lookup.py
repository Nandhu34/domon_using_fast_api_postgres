import dns.resolver

def get_dns_records(domain):
    try:
            
        records = {}
        for record_type in ['A', 'AAAA', 'CNAME', 'NS', 'TXT']:
            try:
                answers = dns.resolver.resolve(domain, record_type)
                records[record_type] = [answer.to_text() for answer in answers]
            except dns.resolver.NoAnswer:
                records[record_type] = []
        return records
    except :
        return False

