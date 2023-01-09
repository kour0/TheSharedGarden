from flask import Blueprint, request, g
from flask_cors import CORS

from bdd import Session
from lib.plant_helper import plants_to_json
from middlewares import auth
from models.Plant import Plant
from models.Plot import Plot

plant = Blueprint('plant', __name__)
session = Session()

CORS(plant, supports_credentials=True)

BASE_URL = '/api/garden/'


@plant.before_request
def before_request():
    try:
        user = auth.authenticate(request)
        g.user = user
    except Exception as e:
        return {'message': str(e)}, 500


@plant.get(BASE_URL + '/plants/')
def get_plants():
    try:
        plants = session.query(Plant).all()
        return plants_to_json(plants)
    except Exception as e:
        return {'message': str(e)}, 500


@plant.patch(BASE_URL + '/<gardens_id>/<plot_id>/plants/<plant_id>')
def update_plant(gardens_id, plot_id, plant_id):
    try:
        data = request.get_json()

        plot = session.query(Plot).filter_by(plot_id=plot_id).first()

        plot.plant = int(plant_id)

        session.add(plot)
        session.commit()

        return {'message': 'Plante ajoutée'}, 200
    except Exception as e:
        return {'message': str(e)}, 500
