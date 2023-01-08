import os

from flask import Blueprint, request, redirect
from flask import send_from_directory, g
from flask_cors import CORS
from flask_uploads import UploadSet, ALL
from lib.image_helper import get_image_name, save_image
from lib.plot_helper import plots_to_json, plot_to_json

from bdd import Session
from middlewares import auth
from models.Accounts import Accounts
from models.Garden import Garden
from models.Link import Link
from models.Plot import Plot
from models.PlotUnit import PlotUnit
from models.Plant import Plant
from routes.map import add_map, delete_map

plot = Blueprint('plot', __name__)
session = Session()

CORS(plot, supports_credentials=True)

BASE_URL = '/api/garden/<garden_id>/plot'


@plot.before_request
def before_request():
    try:
        user = auth.authenticate(request)
        g.user = user
    except Exception as e:
        return {'message': str(e)}, 500

@plot.get(BASE_URL + '/')
def get_plots(garden_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        link = session.query(Link).filter_by(garden_id=garden_id, account_id=user.id).first()
        if not link:
            return {'message': 'You are not a member of this garden'}, 401
        print('ok')

        #plots = session.query(PlotUnit).join(Plot).filter(Plot.garden_id == garden_id).all()
        plots = session.query(Plot).filter(Plot.garden_id == garden_id).all()
        for plot in plots:
            units = session.query(PlotUnit).filter(PlotUnit.plot_id == plot.plot_id).all()
            plot.units = [unit.unit for unit in units]

        # replace plant id by plant object

        return plots_to_json(plots)
    except Exception as e:
        return {'message': str(e)}, 500
    

@plot.post(BASE_URL + '/')
def create_plot(garden_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        if garden.owner!= user.id:
            return {'message': 'You are not the owner of this garden'}, 401
        
        body = request.get_json()
        print(body)
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

        return {'message': 'Plot created successfully', 'plot_id': plot.plot_id}, 200
    except Exception as e:
        print (e)
        return {'message': str(e)}, 500

@plot.patch(BASE_URL + '/<plot_id>')
def upate_plot(garden_id, plot_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        if garden.owner!= user.id:
            return {'message': 'You are not the owner of this garden'}, 401
        
        plot = session.query(Plot).filter_by(plot_id=plot_id).first()

        if not plot or plot.garden_id != garden.id_garden:
            return {'message': 'Plot not found'}, 404
        
        body = request.get_json()

        if ("units" in body.keys()):
            units = body['units']
            session.query(PlotUnit).filter(PlotUnit.plot_id == plot_id).delete()
            session.commit()

            for unit in units:
                unit = PlotUnit(plot_id=plot.plot_id, unit= unit)
                session.add(unit)
        
            session.commit()

        if("name" in body.keys()):
            print(body['name'])
            plot.plot_name = body['name']
            session.add(plot)
            session.commit()

        return {'message': 'Plot updated successfully'}, 200
    except Exception as e:
        return {'message': str(e)}, 500


@plot.delete(BASE_URL + '/<plot_id>')
def delete_plot(garden_id, plot_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404

        if garden.owner!= user.id:
            return {'message': 'You are not the owner of this garden'}, 401
        
        plot = session.query(Plot).filter_by(plot_id=plot_id).first()

        if not plot or plot.garden_id != garden.id_garden:
            return {'message': 'Plot not found'}, 404

        session.query(PlotUnit).filter(PlotUnit.plot_id == plot_id).delete()
        session.query(Plot).filter(Plot.plot_id == plot_id).delete()
        session.commit()

        return {'message': 'Plot deleted successfully'}, 200
    except Exception as e:
        return {'message': str(e)}, 500

        

@plot.patch(BASE_URL + '/<plot_id>/modifyvegetable')
def modify_vegetable(garden_id, plot_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404
        
        plot = session.query(Plot).filter_by(plot_id=plot_id).first()

        if not plot or plot.garden_id != garden.id_garden:
            return {'message': 'Plot not found'}, 404
        
        body = request.get_json()

        if ("vegetable" in body.keys()):
            plant = session.query(Plant).filter_by(name=body['vegetable']).first()
            plot.plant = plant.id
            session.add(plot)
            session.commit()

        return {'message': 'Plot updated successfully'}, 200
    except Exception as e:
        return {'message': str(e)}, 500

@plot.get(BASE_URL + '/<plot_id>/vegetable')
def get_vegetable(garden_id, plot_id):
    try:
        user = g.user

        garden = session.query(Garden).filter_by(id_garden=garden_id).first()

        if not garden:
            return {'message': 'Garden not found'}, 404
        
        plotf = session.query(Plot).filter_by(plot_id=plot_id).first()

        if not plotf or plotf.garden_id != garden.id_garden:
            return {'message': 'Plot not found'}, 404

        plant = session.query(Plant).filter_by(id=plotf.plant).first()
        return {'vegetable': plant.name}, 200
    except Exception as e:
        return {'message': str(e)}, 500