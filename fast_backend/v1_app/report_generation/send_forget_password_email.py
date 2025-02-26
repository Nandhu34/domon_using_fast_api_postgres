

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