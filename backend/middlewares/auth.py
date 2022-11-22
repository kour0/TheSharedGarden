import jwt
from decouple import config
from models.Accounts import Accounts
from requete import *

def authenticate(request):
    token = request.headers.get('Authorization')
    token = token[7:]
    if not token:
        raise Exception('No token provided.')

    decoded = jwt.decode(token, config('JWT_SECRET'), algorithms=['HS256'])
    email = decoded['email']
    account = getEmail(email)
    if not account:
        raise Exception('Not registered.')
    return account