import jwt
from decouple import config
from flask import Blueprint, request

from models.Accounts import Accounts
from ..app import BASE_URL
from ..middlewares import auth

authentication = Blueprint('authentication', __name__)


@authentication.post(BASE_URL + '/signin')
def signin():
    body = request.get_json()
    email = body['email']
    account = Accounts.query.filter_by(email=email).first()
    if not account:
        return 'Not registered.', 401
    encryption = jwt.encode({'email': email}, config('JWT_SECRET'), algorithm='HS256')
    return {'token': encryption}


@authentication.post(BASE_URL + '/signup')
def signup():
    body = request.get_json()

    name = body['name']
    password = body['password']
    email = body['email']
    telephone = body['telephone']
    adress = body['adress']

    account = Accounts(name, password, email, telephone, adress, 'null')
    account.save()
    encryption = jwt.encode({'email': email}, config('JWT_SECRET'), algorithm='HS256')
    return {'token': encryption}


@authentication.get(BASE_URL + '/authtest')
def authtest():
    try:
        res = auth.authenticate(request)
    except Exception as e:
        return {'error': str(e)}, 401
    return res
