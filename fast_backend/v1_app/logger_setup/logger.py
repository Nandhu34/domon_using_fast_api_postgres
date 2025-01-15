import logging
from logging.handlers import TimedRotatingFileHandler
import os
from datetime import datetime

log_dir = "logs"
os.makedirs(log_dir, exist_ok=True)

def get_logger(module_name: str) -> logging.Logger:
    logger = logging.getLogger(module_name)
    logger.setLevel(logging.DEBUG)

    console_handler = logging.StreamHandler()

    log_filename = f"{log_dir}/{module_name}_{datetime.now().strftime('%Y-%m-%d')}.log"
    file_handler = TimedRotatingFileHandler(log_filename, when="midnight", interval=1, backupCount=7)
    
    file_handler.suffix = "%Y-%m-%d.log"  
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger
