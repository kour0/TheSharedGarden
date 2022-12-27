from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer
from sqlalchemy.orm import relationship

from bdd import Base


class Plot(Base):
    __tablename__ = 'plot'

    plot_id = Column('plot_id', Integer(), primary_key=True, autoincrement=True)
    garden_id = Column('garden_id', Integer(), ForeignKey('garden.id_garden'), nullable=False)
    plot_state = Column('plot_state', String(300))
    cultivated_vegetable = Column('cultivated_vegetable', String(300))

    garden = relationship("Garden")

    def __init__(self, garden_id, plot_state=None, cultivated_vegetable=None):
        self.garden_id = garden_id
        self.plot_state = plot_state
        self.cultivated_vegetable = cultivated_vegetable
