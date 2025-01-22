import datetime 
import re 

def parse_whois_with_module(whois_res,domain):
    
        schema={}
        # print("schema1")
        # try:
        #     whois_res=self.malicious_score(whois_res)
        # except Exception as e:
        #     print("Error in getting maliocious score ")
        #     print(e)
        try:
            if type(whois_res["updated_date"]) is type(list()):
                print("updation date is list ",whois_res["updated_date"])
                updated_date=str(whois_res["updated_date"][0])
                print(updated_date,"upd")
                try:
                    date_format=datetime.strptime(updated_date,"%Y-%m-%d %H:%M:%S")
                    schema["updated_date"]=date_format.isoformat()
                except:
                    schema["updated_date"]=updated_date
            elif type(whois_res["updated_date"]) is type(None):
                    schema["updated_date"]=None
            else:
                
                # whois_res["updated_date"]=whois_res["updated_date"]
                updated_date=str(whois_res["updated_date"])
                try:
                    date_format=datetime.strptime(updated_date,"%Y-%m-%d %H:%M:%S")
                    schema["updated_date"]=date_format.isoformat()
                except:
                    schema["updated_date"]=updated_date
                
        except:
            print("except block ")
            try:
              
                # updated_date=whois_res["updated_date"]["$date"]
                if type(whois_res["updated_date"]["$date"]) is type(list()):
                    updated_date=str(whois_res["updated_date"]["$date"][0])
                    try:
                         date_format=datetime.strptime(updated_date,"%Y-%m-%d %H:%M:%S")
                         schema["updated_date"]=date_format.isoformat()
                    except:
                        schema["updated_date"]=updated_date
                elif type(whois_res["updated_date"]["$date"]) is type(None):
                    schema["updated_date"]=None

                else:
                
                    # whois_res["updated_date"]["$date"]=whois_res["updated_date"]["$date"]
                    updated_date=str(whois_res["updated_date"]["$date"])
                    try:
                         date_format=datetime.strptime(updated_date,"%Y-%m-%d %H:%M:%S")
                         schema["updated_date"]=date_format.isoformat()
                    except:
                        schema["updated_date"]=updated_date
                   
                # print(updated_date)
            except:
                      
                      schema["updated_date"]=None
                      print("Updation date not found ")

        try:
            if type(whois_res["creation_date"]) is type(list()):
                creation_date=str(whois_res["creation_date"][0])
                try:
                    date_format=datetime.strptime(creation_date,"%Y-%m-%d %H:%M:%S")
                    schema["creation_date"]=date_format.isoformat()
                except:
                    schema["creation_date"]=creation_date
            elif type(whois_res["creation_date"]) is type(None):
                    schema["creation_date"]=None
            else:
                
                whois_res["creation_date"]=whois_res["creation_date"]
                creation_date=str(whois_res["creation_date"])
                try:
                    date_format=datetime.strptime(creation_date,"%Y-%m-%d %H:%M:%S")
                    schema["creation_date"]=date_format.isoformat()
                except:
                    schema['creation_date']=creation_date
        except:
            try:
              
                # updated_date=whois_res["updated_date"]["$date"]
                if type(whois_res["creation_date"]["$date"]) is type(list()):
                    creation_date=str(whois_res["creation_date"]["$date"][0])
                    try:
                        date_format=datetime.strptime(creation_date,"%Y-%m-%d %H:%M:%S")
                        schema["creation_date"]=date_format.isoformat()
                    except:
                        schema["creation_date"]=creation_date
                elif type(whois_res["creation_date"]) is type(None):
                    schema["creation_date"]=None
                else:
                
                    whois_res["creation_date"]["$date"]=whois_res["creation_date"]["$date"]
                    creation_date=str(whois_res["creation_date"]["$date"])
                    try:
                        date_format=datetime.strptime(creation_date,"%Y-%m-%d %H:%M:%S")
                        schema["creation_date"]=date_format.isoformat()
                    except:
                        schema["creation_date"]=creation_date
                   
                # print(updated_date)
            except:
                      schema["creation_date"]=None
                      print("creation date not found ")
       
        try:   
            if type(whois_res["expiration_date"]) is type(list()):
                expiration_date=str(whois_res["expiration_date"][0])
                try:    
                    date_format=datetime.strptime(expiration_date,"%Y-%m-%d %H:%M:%S")
                    schema["expiration_date"]=date_format.isoformat()
                except:
                               schema["expiration_date"]=expiration_date
            elif type(whois_res["expiration_date"]) is type(None):
                    schema["expiration_date"]=None
            else:
                
                whois_res["expiration_date"]=whois_res["expiration_date"]
                expiration_date=str(whois_res["expiration_date"])
                try:
                    date_format=datetime.strptime(expiration_date,"%Y-%m-%d %H:%M:%S")
                    schema["expiration_date"]=date_format.isoformat()
                except:
                    schema['expiration_date']=expiration_date
        except:
            try:
              
                # updated_date=whois_res["updated_date"]["$date"]
                if type(whois_res["expiration_date"]["$date"]) is type(list()):
                    expiration_date=str(whois_res["expiration_date"]["$date"][0])
                    try:
                         date_format=datetime.strptime(expiration_date,"%Y-%m-%d %H:%M:%S")
                         schema["expiration_date"]=date_format.isoformat()
                    except:
                        schema["expiration_date"]=expiration_date
                elif type(whois_res["expiration_date"]["$date"]) is type(None):
                    schema["expiration_date"]=None
                else:
                
                    whois_res["expiration_date"]["$date"]=whois_res["expiration_date"]["$date"]
                    expiration_date=str(whois_res["expiration_date"]["$date"])
                    try:
                         date_format=datetime.strptime(expiration_date,"%Y-%m-%d %H:%M:%S")
                         schema["expiration_date"]=date_format.isoformat()
                    except:
                        schema["expiration_date"]=expiration_date
                   
                # print(updated_date)
            except:
                      schema["expiration_date"]=None
                      print("expiration date not found ")
        try:
            
            if type(whois_res["city"]) is type([1,23]):
                city =None
                for item in whois_res["city"]:
                    print(item)
                    if item.lower() == "REDACTED FOR PRIVACY".lower():
                        print(" condition matched")
                        continue
                    else:
                        city = city+item
                    print(city )
                schema["city"] = city  
                print(schema['city'])
            else:
                schema['city'] =None
                print(" city is already in string ")
        except:
                    schema["city"]=None
                    print("city ot found ")
        print(schema)
        
              #parsing string field to array field : emails | address | organization | status | name servers | registrar_url

        fields_need_to_array=['emails','address','organization','status','registrar_url','name_servers','state','name','registrant_postal_code','dnssec','org','admin_email','admin_name','phone','registrant_name','registrant_number']
        for key in fields_need_to_array:
            # print(key)
            try:
              if key != 'org' or key !='admin_email':
                if whois_res[key]==None:
                    print("none")
                    schema[key]=[]
                elif whois_res[key]=='':
                    print("empty string ")
                    schema[key]=[]
                elif type(whois_res[key])==type("string"):
                    new_list=[]
                    print("string")
                    new_list.append(whois_res[key])
                    schema[key]=new_list
                elif type(whois_res[key])==type(list()):
                    print("list ")
                    schema[key]=whois_res[key]
                else:
                    print(whois_res[key])
              if key=='org':
                  if whois_res[key]==None:
                    print("none")
                    schema['organization']=[]
                  elif whois_res[key]=='':
                    print("empty string ")
                    schema['organization']=[]
                  elif type(whois_res[key])==type("string"):
                    new_list=[]
                    print("string")
                    new_list.append(whois_res[key])
                    schema['organization']=new_list
                  elif type(whois_res[key])==type(list()):
                    print("list ")
                    schema['organization']=whois_res[key]
                  else:
                    print(whois_res[key])
              if key=='admin_email':
                  if whois_res[key]==None:
                    print("none")
                    schema['emails']=[]
                  elif whois_res[key]=='':
                    print("empty string ")
                    schema['emails']=[]
                  elif type(whois_res[key])==type("string"):
                    new_list=[]
                    print("string")
                    new_list.append(whois_res[key])
                    schema['emails']=new_list
                  elif type(whois_res[key])==type(list()):
                    print("list ")
                    schema['emails']=whois_res[key]
                  else:
                    print(whois_res[key])
                  
                                
            except Exception as e:
                print(e)
                schema[key]=[]
        fields_to_be_string=['registrar','registrar_iana','country','whois_server','referral_url','fax','phone']
        for key in fields_to_be_string:
            # print(key)
            try:
                  schema[key]=whois_res[key]
                  if isinstance(schema[key], list):
                        schema[key] = ', '.join(map(str, schema[key])) 
 

                  if schema[key] == "":
                      schema[key] = None 
            except:
                 schema[key]=None

        try:
            if (whois_res["domain_name"]==None):
                    # self.domain_name_none.add(domain)
                    # return "domain_name_none"
                     schema["domain_name"]=None
            else:
                    if isinstance(whois_res["domain_name"],list):
                        whois_res["domain_name"]=''.join(whois_res["domain_name"][1:])
                        schema["domain_name"]=str(whois_res["domain_name"]).lower()
                    else:

                        schema["domain_name"]=str(whois_res["domain_name"]).lower()
        except:
             print("Error at parsing domain name in get_domain()")
        # print(schema)
        print("Getting commonm data getting from whois data ")
        
#         #   whois apiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
        
        if schema['emails']==[]:
            try:
                if whois_res['registrant']['email']==None:
                   schema['emails']=[]
                elif whois_res['registrant']['email']=='':
                    schema['emails']=[]
                elif type(whois_res['registrant']['email'])==type("string"):
                    print("string ")
                    new_list=[]
                    new_list.append(whois_res['registrant']['email'])
                    schema['emails']=new_list
                else:
                    pass                  
            except:
                pass
        if  schema['organization']==[]:
            try:
                    if whois_res['tech']['organization']==None:
                        schema['organization']=[]
                    elif whois_res['tech']['organization']=='':
                      schema['organization']=[]
                    elif type(whois_res['tech']['organization'])==type("string"):
                        
                        new_list=[]
                        new_list.append(whois_res['tech']['organization'])
                        schema['organization']=new_list
                    else:
                        pass                  
            except:
                schema['organization']=[]
        if schema['organization']==[]:
            try:
                    if whois_res['tech']['org']==None:
                        schema['organization']=[]
                    elif whois_res['tech']['org']=='':
                        schema['organization']=[]
                    elif type(whois_res['tech']['org'])==type("string"):
                    
                        new_list=[]
                        new_list.append(whois_res['tech']['org'])
                        schema['organization']=new_list
                    else:
                        pass                  
            except:
                schema['organization']=[]
        if schema["address"]==[]:
            try:
                    if whois_res["address"]==None:
                        schema["address"]=[]
                    elif whois_res["address"]=='':
                        schema["address"]=[]
                    elif type(whois_res["address"])==type("string"):
                        new_list=[]
                        new_list.append(whois_res["address"])
                        schema["address"]=new_list
                    elif type(whois_res["address"])==type(list()):
                        schema["address"]=whois_res["address"]
                                        
            except:
                 schema["address"]=[]
        try:
         if schema["nameservers"]==[]:
            try:
                    if whois_res["nameservers"]==None:
                        schema["nameservers"]=[]
                    elif whois_res["nameservers"]=='':
                        schema["nameservers"]=[]
                    elif type(whois_res["nameservers"])==type("string"):
                        new_list=[]
                        new_list.append(whois_res["nameservers"])
                        schema["nameservers"]=new_list
                    elif type(whois_res["nameservers"])==type(list()):
                        schema["nameservers"]=whois_res["nameservers"]                     
            except:
                schema["nameservers"]=[]
        except:
            
            schema["nameservers"]=[]
        
        try:
            if whois_res['registrant']['url']==None:
               whois_res['registrant']['url']=[]
            elif whois_res['registrant']['url']=='':
                whois_res['registrant']['url']=[]
            elif type(whois_res['registrant']['url'])==type("string"):
                print("string ")
                new_list=[]
                new_list.append(whois_res['registrant']['url'])
                whois_res['registrant']['url']=new_list
            else:
                pass                  
        except:
            pass
        if schema['registrar_url']==[]:
            try:
                if whois_res['registrar']['url']==None:
                  schema['registrar_url']=[]
                elif whois_res['registrar']['url']=='':
                   schema['registrar_url']=[]
                elif type(whois_res['registrar']['url'])==type("string"):
                    print("string ")
                    new_list=[]
                    new_list.append(whois_res['registrar']['url'])
                    schema['registrar_url']=new_list
                else:
                    pass                  
            except:
               schema['registrar_url']=[]
        if schema['status']==[]:

            try:
                if whois_res['status']==None:
                   schema['status']=[]
                elif whois_res['status']=='':
                    schema['status']=[]
                elif type(whois_res['status'])==type("string"):
                    print("string ")
                    new_list=[]
                    new_list.append(whois_res['status'])
                    schema['status']=new_list
                else:
                    pass                  
            except:
                schema['status']=[]
        if schema['name']==[]:
            try:
                if whois_res['tech']['name']==None:
                   schema['name']=[]
                elif whois_res['tech']['name']=='':
                    schema['name']=[]
                elif type(whois_res['tech']['name'])==type("string"):
                    print("string ")
                    new_list=[]
                    new_list.append(whois_res['tech']['name'])
                    schema['name']=new_list
                else:
                    pass                  
            except:
               schema['name']=[]
        if schema['address']==[]:
            try:
                if whois_res['tech']['street_address']==None:
                  schema['address']=[]
                elif whois_res['tech']['street_address']=='':
                    schema['address']=[]
                elif type(whois_res['tech']['street_address'])==type("string"):
                    print("string ")
                    new_list=[]
                    new_list.append(whois_res['tech']['street_address'])
                    schema['address']=new_list
                else:
                    pass                  
            except:
                schema['address']=[]

        try:
            if whois_res['tech']['region']==None:
               whois_res['tech']['region']=[]
            elif whois_res['tech']['region']=='':
                whois_res['tech']['region']=[]
            elif type(whois_res['tech']['region'])==type("string"):
                print("string ")
                new_list=[]
                new_list.append(whois_res['tech']['region'])
                whois_res['tech']['region']=new_list
            else:
                pass                  
        except:
            pass
        if schema["registrant_postal_code"]==[]:
            try:
                if whois_res['tech']['zip_code']==None:
                    schema["registrant_postal_code"]=[]
                elif whois_res['tech']['zip_code']=='':
                    schema["registrant_postal_code"]=[]
                elif type(whois_res['tech']['zip_code'])==type("string"):
                    print("string ")
                    new_list=[]
                    new_list.append(whois_res['tech']['zip_code'])
                    schema["registrant_postal_code"]=new_list
                else:
                    pass                  
            except:
                schema["registrant_postal_code"]=[]
        if schema['dnssec']==[]:
                try:
                    if whois_res['dnssec']==None:
                     schema['dnssec']=[]
                    elif whois_res['dnssec']=='':
                        schema['dnssec']=[]
                    elif type(whois_res['dnssec'])==type("string"):
                        print("string ")
                        new_list=[]
                        new_list.append(whois_res['dnssec'])
                        schema['dnssec']=new_list
                    else:
                        pass                  
                except:
                    schema['dnssec']=[]


#  try:
#              whois_res["dnssec"]=whois_res["dnssec"]
#         except:
#              whois_res["dnssec"]=None
        if schema['referral_url']==None:
                
            try:
                whois_res["referral_url"]=whois_res["referral_url"]
            except :
                schema["referral_url"]=None
       
        if schema['whois_server']=='':
            try:
                whois_res['whois_server']= whois_res['whois_server']
            except:
                schema['whois_server']=None
        if schema['referral_url']==None:
            try:
                whois_res["referral_url"]=whois_res["referral_url"]
            except:
                schema["referral_url"]=None
       
        if schema['city']=='':
        
          try:
             whois_res['tech']['city']=whois_res['tech']['city']
             if (type(whois_res['tech']['city'])== type([1,2])):
                 city_data = whois_res['tech']['city']
                 city = ', '.join(city_data)
             else :
                  city = whois_res['tech']['city']
             schema  ["city"]=city 
                 
          except:
             schema['city']=None
       
            
        
        if schema['country']=='':
        
            try:
                whois_res['tech']['country']=whois_res['tech']['country']
            except:
                schema['country']=None   
        if schema['registrar_iana']==None:          
            try:
                whois_res[ "registrar"]["iana_id"]=whois_res[ "registrar"]["iana_id"]
            except:
                schema["registrar_iana"]=None
        '''
        # end of apiiiiiiiiiiiiiiiiiiiiiiiiiiii
        # try :
        #     date_str = schema['creation_date'] 
        #     parsed_date = datetime.fromisoformat(date_str)
        
        # # Convert to UTC and format as ISO 8601
        #     iso_date = parsed_date.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
        #     schema ['creation_date'] = iso_date

        # except :
        #     print(" except in update data ")
        #     schema['creation_date'] = None 
        # try :
        #     date_str = schema['expiration_date'] 
        #     parsed_date = datetime.fromisoformat(date_str)
        
        # # Convert to UTC and format as ISO 8601
        #     iso_date = parsed_date.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'

        #     schema ['expiration_date'] = iso_date

        # except :
        #     schema['expiration_date'] = None 
        # try :
        #     date_str = schema['updated_date'] 
        #     parsed_date = datetime.fromisoformat(date_str)
        
        # # Convert to UTC and format as ISO 8601
        #     iso_date = parsed_date.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
        #     schema ['updated_date'] = iso_date

        # except :
        #     schema['updated_date'] = None 
        '''
        email_pattern = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')

        # Loop through each email in the schema['emails'] list
        for i in list(schema['emails']):  # Create a copy of the list to modify it safely
            if not email_pattern.match(i):
                schema['emails'].remove(i)  # Remove the invalid email

        schema_new={}
        schema_new= {
            "domain_name":schema["domain_name"] ,
            "registrar": schema["registrar"],
            "whois_server": schema['whois_server'],
            "referral_url": schema["referral_url"],
            "registrar_url":schema["registrar_url"],
            "updated_date": schema['updated_date'],
            "creation_date": schema['creation_date'],
            "expiration_date": schema['expiration_date'],
            "name_servers": schema['name_servers'],
            "status": schema["status"],
            "emails": schema['emails'],
            "dnssec": schema["dnssec"],
            "name": schema['name'],
            "organization": schema['organization'],
            "address":schema["address"],
            "city": schema['city'],
            "state": schema['state'],
            "registrant_postal_code": schema['registrant_postal_code'],
            "country": schema['country'],
            "registrar_iana":schema["registrar_iana"],
            "admin_name":schema['admin_name'],
            "phone":schema['phone'],
            "fax":schema['fax'],
            "registrant_name":schema['registrant_name'],
            "registrant_number":schema['registrant_number']
            }
        # print(schema['city'])
        #make all none keywords to empty string 
        keys=schema_new.keys()
        keys=(list(keys))
        array_fields=['emails','address','organization','status','registrar_url','name_servers','state','name','registrant_postal_code']
        # print(keys)
        for i in keys:
         if i not in array_fields:
            if schema_new[i]==None:
                schema_new[i]=None 
        # print(schema_new.keys())
        # print()
        # print(fields_need_to_array,fields_to_be_string)
        # print(len(schema_new))
        # print(len(fields_need_to_array)+len(fields_to_be_string))
        print("new",schema_new)
        print(schema["updated_date"])
        return schema_new
        