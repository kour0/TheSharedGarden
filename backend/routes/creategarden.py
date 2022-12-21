import bcrypt
import jwt
from decouple import config
from flask import Blueprint, request, make_response, Flask
from flask_cors import CORS

from bdd import Session
from middlewares import auth
from models.Garden import Garden
from flask_uploads import UploadSet, ALL

creategarden = Blueprint('creategarden', __name__)
session = Session()

CORS(creategarden, supports_credentials=True)

BASE_URL = '/api/'

images = UploadSet('images', ALL)


@creategarden.post(BASE_URL + '/creategarden')
def create():
    try:
        user = auth.authenticate(request)
        # Recupération de l'image
        image = request.files['file']
        # Recupération des données
        body = request.form
        garden_name = body['gardenName']
        country = body['country']
        street_address = body['streetAddress']
        city = body['city']
        region = body['region']
        postal_code = body['postalCode']
        owner, manager = user.username, user.username
        # Création du jardin
        garden = Garden(garden_name=garden_name, owner=owner, manager=manager,
                        street_address=street_address, country=country, city=city, province=region,
                        postal_code=postal_code)
        session.add(garden)
        # Sauvegarde de l'image (Après la création du jardin pour garantir l'unicité du nom)
        images.save(image, name=garden_name + '.' + image.filename.split('.')[-1], folder='garden')
        session.commit()
        return {'message': 'Garden created successfully'}
    except Exception as e:
        session.rollback()
        return {'message': str(e)}, 500
