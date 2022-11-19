import os

basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')

from flask_sqlalchemy import SQLAlchemy
import logging as lg
from ..app import app

db = SQLAlchemy(app)

class Accounts:
    username = db.Column(db.String(300), primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(600), primary_key=True)
    telephone = db.Column(db.Integer(), nullable=False)
    adress = db.Column(db.String(), nullable=False)
    profile_picture = db.Column(db.img(), nullable = True)

    def __init__(self, name, password, email, telephone, adress, profile_picture):
        self.name = name
        self.password = password
        self.email = email
        self.telephone = telephone
        self.adress = adress
        self.profile_picture = profile_picture

db.create_all()

def init_db():
    db.drop_all()
    db.create_all()
    db.session.add(Accounts("Sac à merde", "Noé Steiner", "noe.steiner@telecomnancy.eu", "1234", 0, "dans ton cul"))
    db.session.commit()
    lg.warning('Database initialized!')





