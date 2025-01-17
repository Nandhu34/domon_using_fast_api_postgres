# import config 
# from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
# import asyncio
# from pydantic import BaseModel, EmailStr

# class EmailConfig(BaseModel):
#     MAIL_USERNAME: str
#     MAIL_PASSWORD: str
#     MAIL_FROM: EmailStr
#     MAIL_PORT: int
#     MAIL_SERVER: str
#     MAIL_STARTTLS: bool
#     MAIL_SSL_TLS: bool

# # Replace with actual password or App Password if using 2FA
# email_config = EmailConfig(
#     MAIL_USERNAME="reset-password-domain",
#     MAIL_PASSWORD=config.mail_sender_password,
#     MAIL_FROM=config.mail_sender_email,
#     MAIL_PORT=587,
#     MAIL_SERVER="smtp.gmail.com",
#     MAIL_STARTTLS=True,
#     MAIL_SSL_TLS=False
# )

# conf = ConnectionConfig(
#     MAIL_USERNAME=email_config.MAIL_USERNAME,
#     MAIL_PASSWORD=email_config.MAIL_PASSWORD,
#     MAIL_FROM=email_config.MAIL_FROM,
#     MAIL_PORT=email_config.MAIL_PORT,
#     MAIL_SERVER=email_config.MAIL_SERVER,
#     MAIL_STARTTLS=email_config.MAIL_STARTTLS,
#     MAIL_SSL_TLS=email_config.MAIL_SSL_TLS,
# )

# async def send_reset_password_emails(reset_password_token, email, role):
#     try:

#         reset_url = f"http://127.0.0.1:8000/v1/auth/reset-password/{reset_password_token}"
#         message = MessageSchema(
#             subject="Password Reset",
#             recipients=[email],
#             body=f"""<html><body><p>Reset your password <a href="{reset_url}">here</a>.</p></body></html>""",
#             subtype="html"
#         )
#         fm = FastMail(conf)
#         await fm.send_message(message)
#         return ({"status": "success", "data": "Email sent successfully."})
#     except Exception as e:
#         print(" error ",e )
#         return False

import config 
import smtplib
from email.mime.text import MIMEText
def send_reset_password_email(reset_password_token , to_email, role ):
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    from_email = config.mail_sender_email
    password = config.mail_sender_password  # Use App Password or regular password if less secure apps are enabled
    reset_url = f"http://localhost:3000/reset-password/{reset_password_token}"

    body=f"""<html><body><p>Reset your password <a href="{reset_url}">here</a>.</p></body></html>"""
    msg = MIMEText(body)
    msg['Subject'] = "Reset Password"
    msg['From'] = "whois-forget password"
    msg['To'] = to_email
    msg.set_type("text/html")
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(from_email, password)
        server.sendmail(from_email, to_email, msg.as_string())
        server.quit()
        print("Email sent successfully.")
    except smtplib.SMTPException as e:
        print(f"Error: {e}")