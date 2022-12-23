from flask import Blueprint, request, send_from_directory, redirect, g, url_for
from flask_cors import CORS
import os
from sqlalchemy import update
import time

from bdd import Session
from middlewares import auth
from flask_uploads import UploadSet, ALL
from models.Accounts import Accounts

profile = Blueprint('profile', __name__)
session = Session()

CORS(profile, supports_credentials=True)

BASE_URL = '/api/profile'

images = UploadSet('images', ALL)


@profile.before_request
def before_request():
    try:
        user = auth.authenticate(request)
        g.user = user
    except Exception as e:
        return {'message': str(e)}, 500


@profile.get(BASE_URL + '/')
def get_informations():
    try:
        # On récupère l'utilisateur
        account_id = g.user.id

        # On récupère les informations de l'utilisateur
        user = session.query(Accounts).filter_by(id=account_id).first()

        # On retourne nom et prénom de l'utilisateur
        return {'email': user.email, 'username': user.username, 'first_name': user.first_name,
                'last_name': user.last_name}
    except Exception as e:
        return {'message': str(e)}, 500


@profile.get(BASE_URL + '/image')
def get_image():
    try:
        image_uri = get_image_name(g.user.id)
        return send_from_directory('static/images/profile', image_uri)

    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


@profile.get(BASE_URL + '/<id>/image')
def get_image_by_id(id):
    try:
        image_uri = get_image_name(id)
        return send_from_directory('static/images/profile', image_uri)
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500


def get_image_name(id):
    # On récupère la liste des fichiers contenu dans le dossier images
    files = os.listdir('static/images/profile')
    # On récupère le nom de l'image de l'utilisateur
    image_name = [file for file in files if file.split('.')[0] == str(id)]
    if image_name:
        # On retourne l'image
        return image_name[0]
    else:
        # On retourne l'image par défaut
        return 'default_photo.jpg'


# TODO : regrouper les deux routes en une seule (route / : patch), pour différencier les requêtes : regarder en fonction du type de données envoyées (formdata ou json)
@profile.patch(BASE_URL + '/')
def modify_profile():
    print("Coucou")
    try:
        user = g.user
        print("coucou2")
        body = request.form
        print("coucou3")
        print(request.files['file'])
        image = request.files['file']
        print("coucou4")
        profile = session.query(Accounts).filter_by(username=user.username).first()
        if (body['username'] is not None) or (image is not None):
            username = body["username"]
            profile.username = username
            images.save(image, name=username + '.' +
                                    image.filename.split('.')[-1], folder='profile')
        if (body['last_name'] is not None) and (body["first_name"] is not None):
            profile.first_name = body["first_name"]
            profile.last_name = body["last_name"]
        session.add(profile)
        session.commit()
        return {'message': 'change done'}
    except Exception as e:
        return {'message': str(e)}, 500
