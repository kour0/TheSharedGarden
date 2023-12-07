from bdd import Session
from lib.plant_helper import plant_to_json
from models.Plant import Plant

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
