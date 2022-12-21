from flask import Blueprint, request, send_from_directory, redirect
from flask_cors import CORS
import os

from bdd import Session
from middlewares import auth
from flask_uploads import UploadSet, ALL

profile = Blueprint('profile', __name__)
session = Session()

CORS(profile, supports_credentials=True)

BASE_URL = '/api/'

images = UploadSet('images', ALL)


@profile.get(BASE_URL + '/profile/picture')
def picture():
    try:
        # On récupère l'utilisateur
        user = auth.authenticate(request)
        # On récupère la liste des fichiers contenu dans le dossier images
        files = os.listdir('static/images/profile')
        # On récupère le nom de l'image de l'utilisateur
        image_name = [file for file in files if file.split('.')[0] == user.username]
        if image_name:
            # On retourne l'image
            return send_from_directory('static/images/profile', image_name[0])
        else:
            # On retourne l'image par défaut
            return send_from_directory('static/images/profile', 'default_photo.jpg')
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


@profile.get(BASE_URL + '/profile/username')
def get_username():
    try:
        # On récupère l'utilisateur
        user = auth.authenticate(request)
        # On retourne nom et prénom de l'utilisateur
        return {'username': user.username, 'firstname': user.first_name, 'lastname': user.last_name}
    except Exception as e:
        return {'message': str(e)}, 500
