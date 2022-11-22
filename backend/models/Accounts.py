from sqlalchemy import create_engine, Column
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.types import Integer, String
from flask_sqlalchemy import SQLAlchemy
from bdd import Base

from bdd import Session

session = Session()
class Accounts(Base):
    __tablename__ = 'account'

    username = Column('username', String(300), primary_key=True)
    name = Column('name', String(200), nullable=False)
    password = Column('password', String(), nullable=False)
    email = Column('email', String(600), primary_key=True)
    telephone = Column('telephone', Integer(), nullable=False)
    address = Column('address', String(), nullable=False)
    profile_picture = Column('profile_picture', String(200), nullable=True)

    def __init__(self, username, name, password, email, telephone, adress, profile_picture):
        self.username = username
        self.name = name
        self.password = password
        self.email = email
        self.telephone = telephone
        self.adress = adress
        self.profile_picture = profile_picture

    def getEmail(email):
        return Accounts.query.filter_by(email=email).first()

#"""def init_db():
 #   db.drop_all()
 #   db.create_all()
  #  session.add(Accounts("Sac à merde", "Noé Steiner", "noe.steiner@telecomnancy.eu", "1234", 0, "dans ton cul"))
  #  session.commit()
   # lg.warning('Database initialized!')""

