from flask import Blueprint, request, make_response, Flask
from flask_cors import CORS


from middlewares import auth
from bdd import Session
from models.Garden import Garden
from models.Accounts import Accounts


dashboard = Blueprint('dashboard', __name__)
session = Session()

CORS(dashboard, supports_credentials=True)

BASE_URL = '/api/'

@dashboard.get(BASE_URL + '/dashboard')
def get_garden():
    try:

        account = auth.authenticate(request)

        gardens = session.query(Garden).filter_by(owner=account.username).all()

        return {
            'gardens': gardens_to_json(gardens)
        }
        

    except Exception as e:
        print(e)
        return {'message': str(e)}, 500

def gardens_to_json(gardens):
    return list(map(lambda garden: garden_to_json(garden), gardens))

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