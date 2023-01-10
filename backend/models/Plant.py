from sqlalchemy import Column
from sqlalchemy.types import String, Integer

from bdd import Base


class Plant(Base):
    __tablename__ = 'plant'

    id = Column('id', Integer(), primary_key=True, autoincrement=True)
    name = Column('name', String(300))
    image = Column('image', String(300))
    water_need = Column('water_need', Integer())


    def __init__(self, plant_name, plant_image, water_need):
        self.name = plant_name
        self.image = plant_image
        self.water_need = water_need
