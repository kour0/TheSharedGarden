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

BASE_URL = '/api/auth'


@authentication.post(BASE_URL + '/signin')
def signin():
    try:
        body = request.get_json()
        email = body['email']
        password = body['password']
        remember = body['remember']
        account = session.query(Accounts).filter_by(email=email).first()
        if not account or not (bcrypt.checkpw(password.encode('utf-8'), account.password.encode('utf-8'))):
            raise Exception('Invalid credentials')
        else:
            token = jwt.encode({'email': email}, config('JWT_SECRET'), algorithm='HS256')
            response = make_response({'message': 'Successfully logged in'})
            response.set_cookie('token', token, samesite='None', secure=True,
                                max_age=60 * 60 * 24 * 7 if remember else None)
            return response
    except Exception as e:
        session.rollback()
        return {'message': str(e)}, 500


@authentication.post(BASE_URL + '/signup')
def signup():
    try:
        body = request.get_json()

        first_name = body['first_name']
        last_name = body['last_name']
        username = body['username']
        password = body['password']
        email = body['email']

        if session.query(Accounts).filter_by(email=email).first():
            return {'message': 'Email already registered.'}, 401
        password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        password = password.decode('utf-8')
        account = Accounts(email,username, first_name, last_name, password)
        session.add(account)
        session.commit()
        token = jwt.encode({'email': email}, config('JWT_SECRET'), algorithm='HS256')
        response = make_response({'message': 'Successfully logged in'})
        response.set_cookie('token', token)
        return response
    except Exception as e:
        return {'message': str(e)}, 500

@authentication.post(BASE_URL + '/logout')
def signout():
    try:
        response = make_response({'message': 'Successfully logged out'})
        response.set_cookie('token', '', expires=0)
        return response
    except Exception as e:
        return {'message': str(e)}, 500

@authentication.get(BASE_URL + '/authtest')
def authtest():
    try:
        res = auth.authenticate(request)
        print(res.email)
    except Exception as e:
        return {'message': str(e)}
    return {"email": res.email}
