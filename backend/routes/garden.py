import os

from flask import Blueprint, request, redirect
from flask import send_from_directory, g
from flask_cors import CORS
from flask_uploads import UploadSet, ALL

from bdd import Session
from middlewares import auth
from models.Accounts import Accounts
from models.Garden import Garden
from models.Link import Link
from routes.map import add_map

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

        gardens = session.query(Garden).filter_by(owner=account.username).all()

        return gardens_to_json(gardens)

    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


def gardens_to_json(gardens):
    return [garden_to_json(garden) for garden in gardens]


def garden_to_json(garden):
    owner = session.query(Accounts).filter_by(username=garden.owner).first()

    return {
        'name': garden.garden_name,
        'href': "/",
        'owner': {
            'username': owner.username,
            'profile_picture': owner.profile_picture,
        },
        'manager': garden.manager,
        'type': garden.garden_type,
        'street_address': garden.street_address,
        'city': garden.city,
        'country': garden.country,
        'province': garden.province,
        'postal_code': garden.postal_code,
    }


@garden.get(BASE_URL + '/<garden_name>/image')
def get_garden_image(garden_name):
    try:
        print(garden_name)

        base_image_url = 'static/images/garden'

        files = os.listdir(base_image_url)

        image_name = [file for file in files if file.split('.')[
            0] == garden_name]
        if image_name:
            return send_from_directory(base_image_url, image_name[0])
        else:
            return send_from_directory('static/images/profile', 'default_photo.jpg')
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


# GARDEN ENTITY
@garden.post(BASE_URL + '/create')
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
        street_address = body['streetAddress']
        city = body['city']
        region = body['region']
        postal_code = body['postalCode']
        owner, manager = user.username, user.username
        # Création du jardin
        garden = Garden(garden_name=garden_name, owner=owner, manager=manager, garden_type=garden_type,
                        street_address=street_address, country=country, city=city, province=region,
                        postal_code=postal_code)
        session.add(garden)
        session.commit()
        # Sauvegarde de l'image (Après la création du jardin pour garantir l'unicité du nom)
        images.save(image, name=garden_name + '.' +
                                image.filename.split('.')[-1], folder='garden')
        if garden_type == 'Public':
            print("Public")
            add_map(garden)
        return {'message': 'Garden created successfully'}
    except Exception as e:
        session.rollback()
        return {'message': str(e)}, 500


@garden.get(BASE_URL + '/join/<garden_name>')
def get_join(garden_name):
    try:
        account = g.user
        print(account)
        garden = session.query(Garden).filter_by(garden_name=garden_name).first()
        # TODO : remettre des noms corrects et ne pas faire une redirection, le front doit faire la redirection
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
