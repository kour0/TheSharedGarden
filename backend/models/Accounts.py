from sqlalchemy import Column
from sqlalchemy.types import Integer, String
from datetime import datetime
from bdd import Base

class Accounts(Base):
    __tablename__ = 'account'
    email = Column('email', String(600), primary_key=True)
    username = Column('username', String(300), nullable=False)
    first_name = Column('first_name', String(200), nullable=False)
    last_name = Column('last_name', String(200), nullable=False)
    password = Column('password', String(), nullable=False)
    created_at = Column('created_at', String(), default=datetime.now)
    profile_picture = Column('profile_picture', String(200), nullable=True)

    def __init__(self, username, first_name, last_name, password, email, created_at=datetime.now(), profile_picture=None):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
        self.email = email
        self.created_at = created_at
        self.profile_picture = profile_picture
