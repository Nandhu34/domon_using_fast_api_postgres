from app import mail , Message
import config 
import app 
from logger_configure.logger_setup import logger
def send_mail(receptionist , subject, msg_body ):

    logger.info(" sending mail ")
    try :

        msg = Message(
            subject=subject , 
            sender= config.mail_sending_email, 
            recipients=receptionist
        )
        msg.html = msg_body
        mail.send(msg)
        return True 
    except Exception as e:
        logger.error(str(e))
        return False

