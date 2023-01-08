from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer
from sqlalchemy.orm import relationship

from bdd import Base

class Plant(Base):
    __tablename__ = 'plant'

    id = Column('id', Integer(), primary_key=True, autoincrement=True)
    name = Column('name', String(300))
    image = Column('image', String(300))

    def __init__(self, plant_name, plant_image):
        self.name = plant_name
        self.image = plant_image