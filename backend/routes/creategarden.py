import bcrypt
import jwt
from decouple import config
from flask import Blueprint, request, make_response
from flask_cors import CORS


from bdd import Session
from middlewares import auth
from models.garden import Garden

creategarden = Blueprint('creategarden', __name__)
session = Session()

CORS(creategarden, supports_credentials=True)

BASE_URL = '/api/'

@creategarden.post(BASE_URL + '/creategarden')
def create():
    try:
        user = auth.authenticate(request)
        body = request.get_json()
        gardenName = body['gardenName']
        description = body['streetAddress']
        garden = Garden(owner=user.email, garden_name=gardenName, manager=user.email, garden_adress=description)
        session.add(garden)
        session.commit()
        return {'message': 'Successfully created garden'}
    except Exception as e:
        session.rollback()
        return {'message': str(e)}, 500