from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer
from sqlalchemy.orm import relationship

from bdd import Base


class Own(Base):
    __tablename__ = 'own'
    plot_id = Column('plot_id', String(300), ForeignKey('plot.plot_id'), primary_key=True)
    task_id = Column('task_id', Integer, ForeignKey('task.task_id'),primary_key=True)

    plot = relationship("Plot")
    task = relationship("Task")

    def __init__(self, plot_id, task_id):
        self.plot_id = plot_id
        self.task_id = task_id
