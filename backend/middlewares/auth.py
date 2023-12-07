import jwt
from decouple import config

from bdd import Session
from models.Accounts import Accounts

session = Session()


def authenticate(request, needtoken=False):
    token = request.headers.get('x-access-token')  # Get the token from the cookie
    if not token:
        raise Exception('No token provided.')

    decoded = jwt.decode(token, config('JWT_SECRET'), algorithms=['HS256'])
    email = decoded['email']
    account = session.query(Accounts).filter_by(email=email).first()
    if not account:
        raise Exception('Not registered.')
    if needtoken:
        return account, token
    return account
