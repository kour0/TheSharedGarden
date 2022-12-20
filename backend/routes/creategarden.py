import bcrypt
import jwt
from decouple import config
from flask import Blueprint, request, make_response
from flask_cors import CORS


from bdd import Session
from middlewares import auth
from models.Garden import Garden

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
        country = body['country']
        streetAddress = body['streetAddress']
        city = body['city']
        region = body['region']
        postalCode = body['postalCode']
        garden = Garden(owner=user['username'], garden_name=gardenName, manager=user['username'], country=country, city=city, province=region, postal_code=postalCode)
        session.add(garden)
        session.commit()
        print(body)
        return {'message': 'Successfully created garden'}
    except Exception as e:
        session.rollback()
        return {'message': str(e)}, 500