from flask import Blueprint, request, send_from_directory, redirect, g, url_for
from flask_cors import CORS
import os
from sqlalchemy import update

from bdd import Session
from middlewares import auth
from flask_uploads import UploadSet, ALL
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
       return [{'id': 1, 'name': 'Tomate', 'image': 'https://www.lesjardinsdegaia.com/1048-thickbox_default/tomate-rose-de-berne.jpg'}, {'id': 2, 'name': 'Carotte', 'image': 'https://www.lesjardinsdegaia.com/1048-thickbox_default/tomate-rose-de-berne.jpg'}
       , {'id': 3, 'name': 'Salade', 'image': 'https://www.lesjardinsdegaia.com/1048-thickbox_default/tomate-rose-de-berne.jpg'}, {'id': 4, 'name': 'Haricot', 'image': 'https://www.lesjardinsdegaia.com/1048-thickbox_default/tomate-rose-de-berne.jpg'}
       , {'id': 5, 'name': 'Courgette', 'image': 'https://www.lesjardinsdegaia.com/1048-thickbox_default/tomate-rose-de-berne.jpg'}, {'id': 6, 'name': 'Aubergine', 'image': 'https://www.lesjardinsdegaia.com/1048-thickbox_default/tomate-rose-de-berne.jpg'}
       , {'id': 7, 'name': 'Pomme de terre', 'image': 'https://www.lesjardinsdegaia.com/1048-thickbox_default/tomate-rose-de-berne.jpg'}, {'id': 8, 'name': 'Poireau', 'image': 'https://www.lesjardinsdegaia.com/1048-thickbox_default/tomate-rose-de-berne.jpg'}]
       
    except Exception as e:
        return {'message': str(e)}, 500

@plant.patch(BASE_URL + '/<gardens_id>/<plot_id>/plants/<plant_id>')
def update_plant(gardens_id, plot_id, plant_id):
    try:
        data = request.get_json()

        plot = session.query(Plot).filter_by(plot_id=plot_id).first()

        plot.cultivated_vegetable = plant_id

        session.add(plot)
        session.commit()

        return {'message': 'Plante ajoutée'}, 200
    except Exception as e:
        return {'message': str(e)}, 500
