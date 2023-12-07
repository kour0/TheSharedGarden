# Launch backend

```shell
python3 -m venv env
source ./env/bin/activate
pip install -r requirements.txt
python3 app.py


pip freeze > requirements.txt
```

Ajouter une variable d'environnement appellée JWT_SECRET suivie d'une phrase en base64
