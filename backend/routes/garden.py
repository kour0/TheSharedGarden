import os

from flask import Blueprint, request, redirect
from flask import send_from_directory, g
from flask_cors import CORS
from flask_uploads import UploadSet, ALL
from lib.image_helper import get_image_name, save_image
from lib.garden_helper import gardens_to_json, garden_to_json
from geopy.geocoders import Nominatim

from bdd import Session
from middlewares import auth
from models.Accounts import Accounts
from models.Garden import Garden
from models.Link import Link
from models.Plot import Plot
from models.PlotUnit import PlotUnit
from routes.map import add_map, delete_map

garden = Blueprint('garden', __name__)
session = Session()

CORS(garden, supports_credentials=True)

images = UploadSet('images', ALL)

BASE_URL = '/api/garden'


@garden.before_request
def before_request():
    try:
        user = auth.authenticate(request)
        g.user = user
    except Exception as e:
        return {'message': str(e)}, 500


@garden.get(BASE_URL + '/')
def get_all_gardens():
    try:

        account = g.user
        links = session.query(Link).filter_by(account_id=account.id).all()
        gardens = [session.query(Garden).filter_by(id_garden=link.garden_id).first() for link in links]

        return gardens_to_json(gardens)

    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


@garden.post(BASE_URL + '/')
def create():
    try:

        user = g.user
        # Recupération de l'image
        image = request.files['file']
        # Recupération des données
        body = request.form
        garden_name = body['gardenName']
        garden_type = body['gardenType']
        country = body['country']
        street_address = body['street-address']
        city = body['city']
        region = body['region']
        postal_code = body['postal-code']
        owner, manager = user.id, user.id

        # Création du jardin
        garden = Garden(garden_name=garden_name, owner=owner, manager=manager, garden_type=garden_type,
                        street_address=street_address, country=country, city=city, province=region,
                        postal_code=postal_code)
        session.add(garden)
        session.commit()

        link = Link(account_id=user.id, garden_id=garden.id_garden)
        session.add(link)
        session.commit()
        # Sauvegarde de l'image (Après la création du jardin pour garantir l'unicité du nom)
        save_image(image, garden.id_garden, folder='garden')

        if garden_type == 'public':
            print("Public")
            add_map(garden)

        return {'message': 'Garden created successfully', 'garden_id': garden.id_garden}, 200
    except Exception as e:
        session.rollback()
        return {'message': str(e)}, 500

@garden.post(BASE_URL + '/join/<garden_id>')
def get_join(garden_id):
    try:
        account = g.user
        garden = session.query(Garden).filter_by(id_garden=garden_id).all()
        if not garden:
            return {'message': 'Garden not found'}, 404

        deja = session.query(Link).filter_by(account_id=account.id, garden_id=garden_id).all()
        if deja:
            return {'message': 'Vous êtes déjà membre de ce jardin'}, 401

        link = Link(account_id=account.id, garden_id=garden_id)
        session.add(link)
        session.commit()
        # on redigire vers la page dashboard
        return {'message': 'Vous avez rejoint le jardin ' + garden_id}, 200
    except Exception as e:
        return {'message': str(e)}, 500


@garden.get(BASE_URL + '/name/<garden_name>')
def get_gardens(garden_name):
    try:
        gardens = session.query(Garden).filter(Garden.garden_name.like('%' + garden_name + '%')).all()
        return gardens_to_json(gardens)
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500

