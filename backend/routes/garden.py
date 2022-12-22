from flask import Blueprint, request,send_from_directory, make_response, Flask
from flask_cors import CORS 
import os


from middlewares import auth
from bdd import Session
from models.Garden import Garden
from models.Accounts import Accounts

from flask_uploads import UploadSet, ALL



garden = Blueprint('garden', __name__)
session = Session()

CORS(garden, supports_credentials=True)

images = UploadSet('images', ALL)


BASE_URL = '/api/'

@garden.get(BASE_URL + '/gardens')
def get_all_gardens():
    try:

        account = auth.authenticate(request)

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
        'href' : "/",
        'owner': {
            'username': owner.username,
            'profile_picture' : owner.profile_picture,
        },
        'manager' : garden.manager,
        'type' : garden.garden_type,
        'street_address' : garden.street_address,
        'city' : garden.city,
        'country' : garden.country,
        'province' : garden.province,
        'postal_code' : garden.postal_code,
    }

@garden.get(BASE_URL + '/garden/<garden_name>/image')
def get_garden_image(garden_name):
    try:
        print(garden_name)

        base_image_url = 'static/images/garden'

        files = os.listdir(base_image_url)


        image_name = [file for file in files if file.split('.')[0] == garden_name]
        if image_name:
            return send_from_directory(base_image_url, image_name[0])
        else:
            return send_from_directory('static/images/profile', 'default_photo.jpg')
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500
