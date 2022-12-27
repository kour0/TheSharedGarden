import os

from flask import Blueprint, request, redirect
from flask import send_from_directory, g
from flask_cors import CORS
from flask_uploads import UploadSet, ALL
from lib.image_helper import get_image_name, save_image

from bdd import Session
from middlewares import auth
from models.Accounts import Accounts
from models.Garden import Garden
from models.Link import Link
from models.Plot import Plot
from models.PlotUnit import PlotUnit
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
        links = session.query(Link).filter_by(account_id=account.id).all()
        gardens = [session.query(Garden).filter_by(id_garden=link.garden_id).first() for link in links]

        return gardens_to_json(gardens)

    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


def gardens_to_json(gardens):
    return [garden_to_json(garden) for garden in gardens]


def garden_to_json(garden):
    owner = session.query(Accounts).filter_by(id=garden.owner).first()

    return {
        'id': garden.id_garden,
        'name': garden.garden_name,
        'owner': {
            'username': owner.username,
        },
        'manager': garden.manager,
        'type': garden.garden_type,
        'street_address': garden.street_address,
        'city': garden.city,
        'country': garden.country,
        'province': garden.province,
        'postal_code': garden.postal_code,
    }


@garden.get(BASE_URL + '/<garden_id>/image')
def get_garden_image(garden_id):
    try:
        image_uri = get_image_name(garden_id, 'garden')
        return send_from_directory('static/images/garden', image_uri)
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


@garden.get(BASE_URL + '/name/<garden_name>')
def get_gardens(garden_name):
    try:
        gardens = session.query(Garden).filter(Garden.garden_name.like('%' + garden_name + '%')).all()
        return gardens_to_json(gardens)
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


@garden.get(BASE_URL + '/<garden_id>')
def get_garden(garden_id):
    try:
        garden = session.query(Garden).filter_by(id_garden=garden_id).first()
        return garden_to_json(garden)
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
        owner, manager = user.id, user.id
        # Création du jardin
        garden = Garden(garden_name=garden_name, owner=owner, manager=manager, garden_type=garden_type,
                        street_address=street_address, country=country, city=city, province=region,
                        postal_code=postal_code)
        session.add(garden)
        # TODO regarder pourquoi il faut faire un commit pour avoir l'id du jardin
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


@garden.get(BASE_URL + '/join/<garden_id>')
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

@garden.post(BASE_URL + '/<garden_id>/modeling')
def modeling(garden_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        if garden.owner!= user.id:
            return {'message': 'You are not the owner of this garden'}, 401
        
        body = request.get_json()
        units = body['units']

        if not units:
            return {'message': 'No units provided'}, 400

        plot = Plot(garden_id=garden_id)
        session.add(plot)
        session.commit()

        for unit in units:
            unit = PlotUnit(plot_id=plot.plot_id, unit= unit)
            session.add(unit)

        session.commit()
        
        return {'message': 'Plot created successfully'}, 200
    except Exception as e:
        return {'message': str(e)}, 500

@garden.get(BASE_URL + '/<garden_id>/plots')
def get_plots(garden_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        if garden.owner!= user.id:
            return {'message': 'You are not the owner of this garden'}, 401

        #plots = session.query(PlotUnit).join(Plot).filter(Plot.garden_id == garden_id).all()
        plots = session.query(Plot).filter(Plot.garden_id == garden_id).all()
        for plot in plots:
            units = session.query(PlotUnit).filter(PlotUnit.plot_id == plot.plot_id).all()
            plot.units = [unit.unit for unit in units]

        return plots_to_json(plots)
    except Exception as e:
        return {'message': str(e)}, 500
    
def plots_to_json(plots):
    return [plot_to_json(plot) for plot in plots]

def plot_to_json(plot):
    return {
        'plot_id': plot.plot_id,
        'garden_id': plot.garden_id,
        'units': plot.units
    }

