import jwt
from decouple import config



def authenticate(request):
  token = request.headers.get('Authorization')
  token = token[7:]

  if not token:
    raise Exception('No token provided.')

  decoded = jwt.decode(token, config('JWT_SECRET'), algorithms=['HS256'])
  return decoded
  user = User.from_token(token)
  if not user:
    return None

  return user
