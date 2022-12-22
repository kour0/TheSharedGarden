from sqlalchemy import Column
from sqlalchemy.types import String

from bdd import Base


class Link(Base):
    __tablename__ = 'link'
    username = Column('username', String(300), primary_key=True)
    garden_name = Column('garden_name', String(300), nullable=False)

    def __init__(self, username, garden_name):
        self.username = username
        self.garden_name = garden_name
