import os

from flask import Blueprint, request, redirect
from flask import send_from_directory, g
from flask_cors import CORS
from flask_uploads import UploadSet, ALL

from bdd import Session
from lib.plant_helper import plant_to_json
from middlewares import auth
from models.Accounts import Accounts
from models.Garden import Garden
from models.Link import Link
from models.Plot import Plot
from models.PlotUnit import PlotUnit
from models.Plant import Plant
from routes.map import add_map, delete_map

session = Session()
def plots_to_json(plots):
    return [plot_to_json(plot) for plot in plots]

def plot_to_json(plot):
    plant = session.query(Plant).filter_by(id=plot.plant).first()
    if not plant:
        plant = None
    else:
        plant = plant_to_json(plant)
    return {
        'plot_id': plot.plot_id,
        'garden_id': plot.garden_id,
        'plot_name': plot.plot_name,
        'units': plot.units,
        'plant': plant
    }