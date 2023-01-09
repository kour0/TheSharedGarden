import os

from flask_uploads import UploadSet, ALL

images = UploadSet('images', ALL)


def get_image_name(id, folder):
    # On récupère la liste des fichiers contenu dans le dossier images
    files = os.listdir('static/images/' + folder)
    # On récupère le nom de l'image de l'utilisateur
    image_name = [file for file in files if file.split('.')[0] == str(id)]
    if image_name:
        # On retourne l'image
        return image_name[0]
    else:
        # On retourne l'image par défaut
        return 'default_photo.jpg'


def save_image(image, id, folder):
    # On récupère l'extension de l'image
    extension = image.filename.split('.')[-1]

    delete_image(id, folder)

    # On sauvegarde l'image

    images.save(image, name=str(id) + '.' + extension, folder=folder)


def delete_image(id, folder):
    if get_image_name(id, folder) != 'default_photo.jpg':
        os.remove(os.path.join('static/images/' + folder, get_image_name(id, folder)))
