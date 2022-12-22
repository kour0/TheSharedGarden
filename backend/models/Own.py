from sqlalchemy import Column
from sqlalchemy.types import String, Integer

from bdd import Base


class Own(Base):
    __tablename__ = 'own'
    plot_id = Column('plot_id', String(300), primary_key=True)
    task_id = Column('task_id', Integer, nullable=False)

    def __init__(self, plot_id, task_id):
        self.plot_id = plot_id
        self.task_id = task_id
