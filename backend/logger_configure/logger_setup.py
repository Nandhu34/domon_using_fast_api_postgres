import logging
import os 
import datetime
import config


todays_date = datetime.date.today()
if not  os.path.exists("./logger_configure/"+config.log_folder_name):
                os.makedirs("./logger_configure/"+config.log_folder_name)
print(" logger has been initializing ")
logger = logging.getLogger('my_logger')
logger.setLevel(logging.DEBUG)
log_name=str(todays_date)+'_.log'
log_file ='./logger_configure/'+config.log_folder_name+'/'+log_name
print(log_file)
if not os.path.exists(log_file):
            with open(log_file, 'w') as file:
                    file.write("new_text")

file_handler = logging.FileHandler(log_file,mode='a')
console_handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)
logger.addHandler(file_handler)
logger.addHandler(console_handler)


