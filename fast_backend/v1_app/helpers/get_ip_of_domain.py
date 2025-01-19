# 

import socket

def get_ip_address_of_domain(domain_name ):
        
    ip_add = {socket.gethostbyname(domain_name)}
    ip_add = ip_add.pop()
    # print(type(ip_add))
    return ip_add

