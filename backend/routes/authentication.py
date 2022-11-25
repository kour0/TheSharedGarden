import bcrypt
import jwt
from decouple import config
from flask import Blueprint, request, make_response
from flask_cors import CORS


from bdd import Session
from middlewares import auth
from models.Accounts import Accounts

authentication = Blueprint('authentication', __name__)
session = Session()

CORS(authentication, supports_credentials=True)

BASE_URL = '/api/'


@authentication.post(BASE_URL + '/signin')
def signin():
    try:
        body = request.get_json()
        email = body['email']
        password = body['password']
        account = session.query(Accounts).filter_by(email=email).first()
        if not account or not (bcrypt.checkpw(password.encode('utf-8'), account.password.encode('utf-8'))):
            raise Exception('Invalid credentials')
        else :
            token = jwt.encode({'email': email}, config('JWT_SECRET'), algorithm='HS256')
            response = make_response({'message': 'Successfully logged in'})
            response.set_cookie('Authorization', 'Bearer ' + token)
            return response
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

        if session.query(Accounts).filter_by(email=email).first():
            return {'message': 'Email already registered.'}, 401
        password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        password = password.decode('utf-8')
        account = Accounts(username, name, password, email)
        session.add(account)
        session.commit()
        token = jwt.encode({'email': email}, config('JWT_SECRET'), algorithm='HS256')
        response = make_response({'message': 'Successfully logged in'})
        response.set_cookie('Authorization', 'Bearer ' + token)
        return response
    except Exception as e:
        return {'message': str(e)}, 500


@authentication.get(BASE_URL + '/authtest')
def authtest():
    try:
        res = auth.authenticate(request)
    except Exception as e:
        return {'message': str(e)}, e.args[1]
    return res
