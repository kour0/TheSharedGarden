from flask import Blueprint, request, make_response, Flask
from flask_cors import CORS


from middlewares import auth
from bdd import Session


profile = Blueprint('profile', __name__)
session = Session()

CORS(profile, supports_credentials=True)

BASE_URL = '/api/'

@profile.get(BASE_URL + '/profile')
def get_profile():
    try:

        account = auth.authenticate(request)
        
        return {
            'email': account.email,
            'username': account.username,
            'first_name': account.first_name,
            'last_name': account.last_name,
        }

    except Exception as e:
        print(e)
        return {'message': str(e)}, 500
