from flask import Blueprint 

login_blueprint = Blueprint('login_route',__name__)




@login_blueprint.route('/login', methods=['POST'])
def login():
    return ({"data":"sampel login route "})


