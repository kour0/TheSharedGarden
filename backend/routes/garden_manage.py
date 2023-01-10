from flask import Blueprint, request
from flask import send_from_directory, g
from flask_cors import CORS
from flask_uploads import UploadSet, ALL
from geopy.geocoders import Nominatim

from bdd import Session
from lib.garden_helper import garden_to_json
from lib.garden_water import solveur_sources
from lib.image_helper import get_image_name, save_image, delete_image
from lib.profile_helper import members_to_json
from middlewares import auth
from models.Garden import Garden
from models.Link import Link
from models.Plot import Plot
from models.PlotUnit import PlotUnit
from models.Task import Task
from models.Plant import Plant
from routes.map import add_map, delete_map
import numpy as np

gardenManage = Blueprint('gardenManage', __name__)
session = Session()

CORS(gardenManage, supports_credentials=True)

images = UploadSet('images', ALL)

BASE_URL = '/api/garden/<garden_id>'


@gardenManage.before_request
def before_request():
    try:
        user = auth.authenticate(request)
        g.user = user
    except Exception as e:
        return {'message': str(e)}, 500


@gardenManage.get(BASE_URL + '/')
def get_garden(garden_id):
    try:

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        link = session.query(Link).filter_by(garden_id=garden_id, account_id=g.user.id).first()
        if not link:
            return {'message': 'You are not in this garden'}, 403

        return garden_to_json(garden)
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


@gardenManage.get(BASE_URL + '/image')
def get_garden_image(garden_id):
    try:
        garden = session.query(Garden).filter_by(id_garden=garden_id).first()
        if not garden:
            return {'message': 'Garden not found'}, 404

        image_uri = get_image_name(garden_id, 'garden')
        return send_from_directory('static/images/garden', image_uri)
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


@gardenManage.patch(BASE_URL + '/')
def modify(garden_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()
        if not garden:
            return {'message': 'Garden not found'}, 404

        if garden.manager != user.id:
            return {'message': 'You are not the manager of this garden'}, 403

        # Recupération de l'image
        try:
            image = request.files['file']
        except:
            image = None
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
        # Création du jardin et check si le user a le droit de le modifier
        garden = session.query(Garden).filter_by(id_garden=garden_id).first()
        if garden.manager != user.id:
            return {'message': 'You are not the manager of this garden'}, 403
        garden.garden_name = garden_name
        if garden.street_address != street_address or garden.city != city or garden.country != country or garden.province != region or garden.postal_code != postal_code:
            geolocator = Nominatim(user_agent="ppii-2022")
            location = geolocator.geocode(street_address + ' ' + city + ' ' + country)
            if location is None:
                return {'message': 'Invalid address'}, 403
            garden.street_address = street_address
            garden.city = city
            garden.country = country
            garden.province = region
            garden.postal_code = postal_code
        print('good')
        if garden_type == 'private' and garden.garden_type == 'public':
            delete_map(garden.id_garden)
        if garden_type == 'public':
            add_map(garden)
        garden.garden_type = garden_type
        session.commit()
        # Sauvegarde de l'image (Après la création du jardin pour garantir l'unicité du nom)
        if image is not None:
            save_image(image, garden.id_garden, folder='garden')
        return {'message': 'Garden modified successfully', 'garden_id': garden.id_garden}, 200
    except Exception as e:
        session.rollback()
        print(e)
        return {'message': str(e)}, 500


@gardenManage.delete(BASE_URL + '/')
def delete(garden_id):
    try:
        user = g.user
        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        if garden.manager != user.id:
            return {'message': 'You are not the manager of this garden'}, 403

        session.delete(garden)
        session.commit()

        links = session.query(Link).filter_by(garden_id=garden_id).all()
        for link in links:
            session.delete(link)

        session.commit()

        plots = session.query(Plot).filter_by(garden_id=garden_id).all()
        for plot in plots:
            plot_units = session.query(PlotUnit).filter_by(plot_id=plot.plot_id).all()
            for plot_unit in plot_units:
                session.delete(plot_unit)

            plot_tasks = session.query(Task).filter_by(plot_id=plot.plot_id).all()
            for plot_task in plot_tasks:
                session.delete(plot_task)

            session.delete(plot)
        session.commit()

        delete_image(garden_id, folder='garden')

        if garden.garden_type == 'public':
            delete_map(garden.id_garden)

        return {'message': 'Garden deleted successfully'}, 200
    except Exception as e:
        session.rollback()
        print(e)
        return {'message': str(e)}, 500


@gardenManage.get(BASE_URL + '/members')
def get_members(garden_id):
    try:
        user = g.user
        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        link = session.query(Link).filter_by(garden_id=garden_id, account_id=user.id).first()
        if not link:
            return {'message': 'You are not in this garden'}, 403

        members = session.query(Link).filter_by(garden_id=garden_id).all()
        if not members:
            return {'message': 'No members in this garden'}, 404

        return members_to_json(members), 200
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


@gardenManage.delete(BASE_URL + '/members/<member_id>')
def delete_member(garden_id, member_id):
    try:
        user = g.user
        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        if garden.manager != user.id:
            return {'message': 'You are not the manager of this garden'}, 403

        if garden.manager == int(member_id):
            return {'message': 'You can\'t delete the manager of this garden'}, 403

        link = session.query(Link).filter_by(garden_id=garden_id, account_id=member_id).first()
        if not link:
            return {'message': 'Member not found'}, 404

        session.delete(link)
        session.commit()

        return {'message': 'Member deleted successfully'}, 200
    except Exception as e:
        session.rollback()
        print(e)
        return {'message': str(e)}, 500


@gardenManage.get(BASE_URL + '/watering')
def get_watering(garden_id):
    try:

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()
        if not garden:
            return {'message': 'Garden not found'}, 404

        plots = session.query(Plot).filter_by(garden_id=garden_id).all()

        if not plots:
            return {'message': 'Plot not found'}, 404


        field = np.zeros((12, 12), dtype=int)
        arrosage = False

        for plot in plots:
            units = session.query(PlotUnit).filter_by(plot_id=plot.plot_id).all()
            plant = session.query(Plant).filter_by(id=plot.plant).first()
            if plant :
                for unit in units:
                    field[unit.x][unit.y] = plant.water_need
                    arrosage = True

        if arrosage:
            list_water = solveur_sources(field)
            return list_water

        return [], 200
    except Exception as e:
        return {'message': str(e)}, 500
