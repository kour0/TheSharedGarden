from middlewares import auth
from decouple import config
from flask import request
from flask import g
import jwt
from flask import Flask
from flask import request
from flask import send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

BASE_URL = '/api/'

DATABASE = ''


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.errorhandler(404)
def page_not_found(e):
    return 'HTTP 404 Not Found', 404


@app.get('/status')
def status():
    return 'Bonsoir Giga Chad'


@app.post(BASE_URL + '/signin')
def signin():
    body = request.get_json()
    email = body['email']
    password = body['password']
    jwtEncryption = jwt.encode({'email': email, 'password': password}, config('JWT_SECRET'), algorithm='HS256')

    return {'token': jwtEncryption}

@app.get(BASE_URL + '/authtest')
def authtest():
    try:
        res = auth.authenticate(request)
    except Exception as e:
        return {'error': str(e)}, 401
    return res

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/hooktest', methods=['POST'])
def hook_root():
    os.execlp('kill', 'kill', '1')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5454, debug=True)
