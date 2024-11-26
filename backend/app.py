from flask import Flask , request , jsonify 
from routes.login_routes import login_blueprint
import config 


app = Flask(__name__)


app.register_blueprint(login_blueprint, url_prefix="/v1/auth" )


@app.errorhandler(422)
def handle_400_error(   error):
    response = {
        "status": "error",
        "error_message": error.description, 
        
    }
    return jsonify(response), 422


@app.errorhandler(404)
def handle_400_error(   error):
    response = {
        "status": "error",
        "error_message": error.description, 
        
    }
    return jsonify(response), 404


@app.errorhandler(401)
def handle_400_error(   error):
    response = {
        "status": "error",
        "error_message": error.description, 
        
    }
    return jsonify(response), 401

if __name__ == '__main__':

    app.run(debug= True , port= config.port)