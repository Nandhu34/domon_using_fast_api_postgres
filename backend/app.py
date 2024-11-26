from flask import Flask , request , jsonify 
from routes.login_routes import login_blueprint

app = Flask(__name__)


app.register_blueprint(login_blueprint, url_prefix="/v1/auth" )

if __name__ == '__main__':

    app.run(debug= True )