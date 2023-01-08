from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer
from sqlalchemy.orm import relationship

from bdd import Base


class Plot(Base):
    __tablename__ = 'plot'

    plot_id = Column('plot_id', Integer(), primary_key=True, autoincrement=True)
    garden_id = Column('garden_id', Integer(), ForeignKey('garden.id_garden'), nullable=False)
    plot_name = Column('plot_name', String(300))
    plot_state = Column('plot_state', String(300))
    plant = Column('plant', Integer(), ForeignKey('plant.id'), nullable=True)

    garden = relationship("Garden")

    def __init__(self, garden_id, plot_name=None, plot_state=None, plant=None):
        self.garden_id = garden_id
        self.plot_name = plot_name
        self.plot_state = plot_state
        self.plant = plant
