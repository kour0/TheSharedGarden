import jwt
from decouple import config

from bdd import Session
from models.Accounts import Accounts

session = Session()


def authenticate(request):
    token = request.headers.get('Cookie')  # Get the token from the cookie
    token = token[token.index('Bearer')+len('Bearer')+1:-1]
    if not token:
        raise Exception('No token provided.')

    decoded = jwt.decode(token, config('JWT_SECRET'), algorithms=['HS256'])
    email = decoded['email']
    account = session.query(Accounts).filter_by(email=email).first()
    if not account:
        raise Exception('Not registered.')
    return account
