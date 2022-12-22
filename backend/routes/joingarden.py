import sqlite3

from bdd import Session
from middlewares import auth
from flask import Blueprint, request, make_response, url_for, redirect
from flask_cors import CORS

from models.Garden import Garden
from models.Link import Link

joingarden = Blueprint('joingarden', __name__)
session = Session()

CORS(joingarden, supports_credentials=True)

BASE_URL = '/api/'


@joingarden.post(BASE_URL + '/join-garden')
def join():
    try:
        body = request.get_json()
        garden_name = body['garden_name']
        print(garden_name)
        account = auth.authenticate(request)
        print(account)
        garden = session.query(Garden).filter_by(garden_name=garden_name).first()
        print(garden.garden_name)
        link = Link(username=account.username, garden_name=garden_name)
        session.add(link)
        try:
            session.commit()
            return {'message': 'You have joined the garden'}
        except:
            session.rollback()
            return {'message': 'You have already joined this garden'}
    except Exception as e:
        session.rollback()
        return {'message': str(e)}, 500


@joingarden.get(BASE_URL + '/join-garden/<garden_name>')
def get_join(garden_name):
    try:
        account = auth.authenticate(request)
        print(account)
        garden = session.query(Garden).filter_by(garden_name=garden_name).first()
        deja = session.query(Link).filter_by(username=account.username, garden_name=garden_name).first()
        if deja:
            print("deja")
            return redirect('http://127.0.0.1:5173/app/dashboard')
        link = Link(username=account.username, garden_name=garden_name)
        session.add(link)
        session.commit()
        # on redigire vers la page dashboard
        return redirect('http://127.0.0.1:5173/app/dashboard')
    except Exception as e:
        return {'message': str(e)}, 500
