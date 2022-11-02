import json
from flask import g
from flask import Flask
import sqlite3

app = Flask(__name__)

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
    return 'running'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5454, debug=True)
