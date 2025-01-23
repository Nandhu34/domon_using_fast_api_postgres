from ..db_operations.db_creation import register_score_details_coll


def get_register_score(registrar_name ):
  
    score=0
    try :
        if registrar_name !=None:
            query=register_score_details_coll.find_one({"registrar_name":registrar_name})
            if query !=None:
                score=query["registrar_value"]
                score=int(score.replace('%',''))
        else:
            print("registrar is none")
        
        return score 
    except Exception as e:
        return False  
    

    