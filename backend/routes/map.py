import folium
from flask import Blueprint
from flask_cors import CORS
from geopy.geocoders import Nominatim

from bdd import Session
from models.Garden import Garden

map = Blueprint('map', __name__)
session = Session()

CORS(map, supports_credentials=True)

BASE_URL = '/api/'

m = folium.Map(location=[48.6689443, 6.1552047], zoom_start=12)


def create_map():
    global m
    folium.Marker(location=[48.6689443, 6.1552047], popup="Giga Chad", tooltip="Giga Chad").add_to(m)
    folium.Marker(location=[48.6834987, 6.1603767], popup="Sac à merde", tooltip="Sac à merde").add_to(m)

    # On récupère les coordonnées de chaque jardin qui sont publiques
    liste_garden = session.query(Garden).filter_by(garden_type="Public").all()
    for garden in liste_garden:
        # On convertit l'adresse en coordonnées
        geolocator = Nominatim(user_agent="ppii-2022")
        location = geolocator.geocode(garden.street_address + " " + str(garden.postal_code) + " " + garden.city)
        # On crée un popup avec un lien vers la page du jardin

        if location != None:
            url = folium.Html(
                '<a target="_top" href="http://127.0.0.1:5454/api/join-garden/' + garden.garden_name + '">Rejoindre le jardin</a>',
                script=True)
            popup = folium.Popup(url, max_width=2650)
            # On ajoute un marqueur sur la carte avec dans le popup un lien vers la page pour rejoindre le jardin
            folium.Marker([location.latitude, location.longitude], popup=popup, tooltip=garden.garden_name).add_to(m)


@map.route('/map')
def render_map():
    carte = m._repr_html_()
    return carte


def add_map(last_garden):
    geolocator = Nominatim(user_agent="ppii-2022")
    location = geolocator.geocode(
        last_garden.street_address + " " + str(last_garden.postal_code) + " " + last_garden.city)
    # On ajoute un marqueur sur la carte avec dans le popup un lien vers la page du jardin
    url = folium.Html(
        '<a target="_top" href="http://127.0.0.1:5454/api/join-garden/' + last_garden.garden_name + '">Rejoindre le jardin</a>',
        script=True)
    popup = folium.Popup(url, max_width=2650)
    folium.Marker([location.latitude, location.longitude], popup=popup, tooltip=last_garden.garden_name).add_to(m)
