

import dns.resolver               
def get_mx_record(domain_name):
         mx=[]
         try:
                answers = dns.resolver.resolve(domain_name, 'MX')
                for rdata in answers:
                   data=rdata.exchange.to_text()
                   final_data=data.replace("<DNS name","")
                   mx.append(final_data)
                if type(mx)==list:
                    if mx:
                        mx_count=1
                    return mx
         except:
            return False 
         

