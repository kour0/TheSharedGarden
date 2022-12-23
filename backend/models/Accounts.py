from datetime import datetime

from sqlalchemy import Column, Identity
from sqlalchemy.types import String, Integer

from bdd import Base


class Accounts(Base):
    __tablename__ = 'account'

    id = Column('id', Integer(), primary_key=True, autoincrement=True)
    email = Column('email', String(600), unique = True, nullable=False)
    username = Column('username', String(300), unique = True, nullable=False)
    first_name = Column('first_name', String(200), nullable=False)
    last_name = Column('last_name', String(200), nullable=False)
    password = Column('password', String(), nullable=False)
    created_at = Column('created_at', String(), default=datetime.now)

    def __init__(self, email, username, first_name, last_name, password, created_at=datetime.now()):
        self.email = email
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
        self.created_at = created_at
