from flask import Flask , request , jsonify 
from routes.login_routes import login_blueprint
import config 
from flask_mail import Mail, Message


app = Flask(__name__)


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = config.mail_sending_email     # Use your actual Gmail address
app.config['MAIL_PASSWORD'] = config.token_for_sending_email    # Use your generated App Password
app.config['MAIL_USE_TLS'] = False 
app.config['MAIL_USE_SSL'] = True 

mail = Mail(app )

app.register_blueprint(login_blueprint, url_prefix="/v1/auth" )

@app.route('/send_main', methods=['POST'])
def send_main():
    from helpers.send_gmail import send_mail
    return send_mail()


@app.errorhandler(422)
def handle_422_error(   error):
    response = {
        "status": "error",
        "error_message": error.description, 
        
    }
    return jsonify(response), 422


@app.errorhandler(404)
def handle_404_error(   error):
    response = {
        "status": "error",
        "error_message": error.description, 
        
    }
    return jsonify(response), 404


@app.errorhandler(401)
def handle_401_error(   error):
    response = {
        "status": "error",
        "error_message": error.description, 
        
    }
    return jsonify(response), 401


@app.errorhandler(400)
def handle_401_error(   error):
    response = {
        "status": "error",
        "error_message": error.description, 
        
    }
    return jsonify(response), 401


if __name__ == '__main__':

    app.run(debug= True , port= config.port)