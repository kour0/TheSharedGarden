import folium
import htmlentities as htmlentities
from flask import Blueprint, g, request
from flask_cors import CORS
from geopy.geocoders import Nominatim
from middlewares import auth

from bdd import Session
from models.Garden import Garden
from models.Link import Link

map = Blueprint('map', __name__)
session = Session()

CORS(map, supports_credentials=True)

BASE_URL = '/api/'

m = folium.Map(location=[48.6689443, 6.1552047], zoom_start=12)


@map.before_request
def before_request():
    try:
        user, token = auth.authenticate(request, True)
        g.user = user
        g.token = token
    except Exception as e:
        return {'message': str(e)}, 500


def create_map():
    global m
    folium.Marker(location=[48.6689443, 6.1552047], popup="Giga Chad", tooltip="Giga Chad").add_to(m)
    folium.Marker(location=[48.6834987, 6.1603767], popup="Sac à merde", tooltip="Sac à merde").add_to(m)

    # On récupère les coordonnées de chaque jardin qui sont publiques
    liste_garden = session.query(Garden).filter_by(garden_type="public").all()
    for garden in liste_garden:
        # On convertit l'adresse en coordonnées
        geolocator = Nominatim(user_agent="ppii-2022")
        location = geolocator.geocode(garden.street_address + " " + str(garden.postal_code) + " " + garden.city)
        # On crée un popup avec un lien vers la page du jardin

        if location is not None:
            # url = folium.Html(
            #     '<a href="http://127.0.0.1:5454/api/garden/join/' + garden.garden_name + '">Rejoindre le jardin</a>',
            #     script=True)
            # Créer un popup qui contient un script qui fait un appel à l'api pour rejoindre le jardin et qui redirige vers la page dashboard quand on clique sur un lien
            url = folium.Html('<div id="'+str(garden.id_garden)+'"><button onClick="joinGarden('+str(garden.id_garden)+')">Rejoindre le jardin</button></div>',
                              script=True)
            # Personnaliser le nom du popup avec l'id du jardin
            popup = folium.Popup(url, max_width=2650)
            # On ajoute un marqueur sur la carte avec dans le popup un lien vers la page du jardin
            # On personnalise l'id du marqueur avec l'id du jardin
            # On ajoute un enfant au marqueur avec l'id du jardin
            m.add_child(folium.Marker([location.latitude, location.longitude], popup=popup, tooltip=garden.garden_name), name=str(garden.id_garden), index=str(garden.id_garden))

@map.route(BASE_URL + '/map')
def render_map():
    global m
    liste_garden = session.query(Link).filter_by(account_id=g.user.id).all()
    cookie = g.token
    # On supprime les marqueurs où l'utilisateur a déjà rejoint un jardin
    for garden in liste_garden:
        # On récupère le premier marker qui a l'id du jardin dans le dictionnaire des enfants de la carte
        marker = m._children.get(str(garden.garden_id))
        # On recrée le marker avec un popup différent et une couleur différente avec add_child
        nom_tooltip = list(marker._children.values())[1]
        popup = folium.Popup('<div id="' + str(garden.garden_id) + '">Vous avez déjà rejoint ce jardin</div>', max_width=2650)
        m.add_child(folium.Marker([marker.location[0], marker.location[1]], popup=popup, tooltip=nom_tooltip, icon=folium.Icon(color='red')), name=str(garden.garden_id), index=str(garden.garden_id))
    carte = m._repr_html_()
    # Ajouter une fonction joinGarden qui fait un appel à l'api pour rejoindre le jardin et changer le bouton en une icone succès
    script = """
    <script>
        async function joinGarden(id_garden) {
            try {
            const div = document.getElementById(id_garden);
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://127.0.0.1:5454/api/garden/join/" + id_garden, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("x-access-token", """ + '"' + cookie + '"' + """);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>';
                }
                if (this.readyState == 4 && this.status == 401) {
                    div.innerHTML = '<div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg><h1>Vous avez déjà rejoint ce jardin</h1></div>';
                }
            };
            console.log(id_garden);
            xhttp.send();
            }
            catch (e) {
                console.log(e);
                // Coucou jeune aventurier, si tu vois ce message c'est que tu as réussi à trouver un moyen de contourner le système de sécurité de l'api
            }
        }
    </script>
    """
    script = htmlentities.encode(script)
    index = carte.find('&lt;script')
    # On insère le script juste avant la dernière balise script
    carte = carte[:index] + script + carte[index:]
    return carte


def add_map(last_garden):
    geolocator = Nominatim(user_agent="ppii-2022")
    location = geolocator.geocode(
        last_garden.street_address + " " + str(last_garden.postal_code) + " " + last_garden.city)
    # On ajoute un marqueur sur la carte avec dans le popup un lien vers la page du jardin
    url = folium.Html('<div id="' + str(last_garden.id_garden) + '"><button onClick="joinGarden(' + str(
        last_garden.id_garden) + ')">Rejoindre le jardin</button></div>',
                      script=True)
    popup = folium.Popup(url, max_width=2650)
    folium.Marker([location.latitude, location.longitude], popup=popup, tooltip=last_garden.garden_name).add_to(m)
