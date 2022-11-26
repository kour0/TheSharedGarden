from bdd import Session
from middlewares import auth
from flask import Blueprint, request, make_response
from flask_cors import CORS

joingarden = Blueprint('joingarden', __name__)
session = Session()

CORS(joingarden, supports_credentials=True)

BASE_URL = '/api/'


@joingarden.post(BASE_URL + '/join-garden')
def join():
    try:
        body = request.get_json()
        garden_id = body['garden-id']
        print(garden_id)
        account = auth.authenticate(request)
        print(account)
        #account.garden_id = garden_id
        #session.commit()
        return {'message': 'Successfully joined garden'}
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500
