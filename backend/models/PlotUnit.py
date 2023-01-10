from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer

from bdd import Base


class PlotUnit(Base):
    __tablename__ = 'plot_unit'

    plot_id = Column('plot_id', Integer(), ForeignKey('plot.plot_id'), primary_key=True)
    x = Column('x', Integer(), primary_key=True)
    y = Column('y', Integer(), primary_key=True)

    plot = relationship("Plot")

    def __init__(self, plot_id, x, y):
        self.plot_id = plot_id
        self.x = x
        self.y = y
