import jwt
from decouple import config
from flask import Blueprint, request

from bdd import Session
from middlewares import auth
from models.Accounts import Accounts

authentication = Blueprint('authentication', __name__)
session = Session()

BASE_URL = '/api/'


@authentication.post(BASE_URL + '/signin')
def signin():
    try:
        body = request.get_json()
        email = body['email']
        account = session.query(Accounts).filter_by(email=email).first()
        if not account:
            return {'message': 'Not registered.'}, 401
        encryption = jwt.encode({'email': email}, config('JWT_SECRET'), algorithm='HS256')
        return {'token': encryption}
    except Exception as e:
        session.rollback()
        return {'message': str(e)}, 500


@authentication.post(BASE_URL + '/signup')
def signup():
    try:
        body = request.get_json()

        name = body['name']
        username = body['username']
        password = body['password']
        email = body['email']

        account = Accounts(username, name, password, email)
        session.add(account)
        session.commit()
        encryption = jwt.encode({'email': email}, config('JWT_SECRET'), algorithm='HS256')
        return {'token': encryption}
    except Exception as e:
        return {'message': str(e)}, 500


@authentication.get(BASE_URL + '/authtest')
def authtest():
    try:
        res = auth.authenticate(request)
    except Exception as e:
        return {'error': str(e)}, 401
    return res
