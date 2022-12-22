from sqlalchemy import Column
from sqlalchemy.types import String, Integer

from bdd import Base


class Plot(Base):
    __tablename__ = 'plot'
    plot_id = Column('plot_id', Integer, primary_key=True)
    garden_name = Column('garden_name', String(200), nullable=False)
    plot_state = Column('plot_state', String(300), nullable=False)
    cultivated_vegetable = Column('cultivated_vegetable', String(300), nullable=False)

    def __init__(self, plot_id, plot_state, cultivated_vegetable):
        self.plot_id = plot_id
        self.plot_state = plot_state
        self.cultivated_vegetable = cultivated_vegetable
