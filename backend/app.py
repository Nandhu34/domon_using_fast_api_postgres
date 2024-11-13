from flask import Flask , request , jsonify 


app = Flask(__name__)



@app.route('/home', methods=['POST'])
def sample_route():
    return ({"data":"hihih"})



if __name__ == '__main__':
    app.run(debug= True )