from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer

from bdd import Base


class PlotUnit(Base):
    __tablename__ = 'plot_unit'

    plot_id = Column('plot_id', Integer(), ForeignKey('plot.plot_id'), primary_key=True)
    unit = Column('unit', Integer(), primary_key=True)

    plot = relationship("Plot")

    def __init__(self, plot_id, unit):
        self.plot_id = plot_id
        self.unit = unit
