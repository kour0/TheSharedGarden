import os

from flask import Flask
from flask import send_from_directory, request, Response, g
from flask_cors import CORS
from flask_uploads import configure_uploads, UploadSet, ALL

from routes import authentication
from routes import garden
from routes import map
from routes import profile
from routes import task

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.register_blueprint(authentication.authentication)
app.register_blueprint(profile.profile)
app.register_blueprint(garden.garden)
app.register_blueprint(map.map)
app.register_blueprint(task.task)

basedir = os.path.abspath(os.path.dirname(__file__))

images = UploadSet('images', ALL)
app.config['UPLOADED_IMAGES_DEST'] = basedir + '/static/images'
configure_uploads(app, images)

DATABASE = 'data/data.db'

# Creation de la carte
map.create_map()

@app.before_request
def before_request():
    if request.method.lower() == 'options':
        return Response()

@app.errorhandler(404)
def page_not_found(e):
    return 'HTTP 404 Not Found', 404


@app.get('/status')
def status():
    return 'Bonsoir Giga Chad'


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/hooktest', methods=['POST'])
def hook_root():
    os.execlp('kill', 'kill', '1')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5454, debug=True)
