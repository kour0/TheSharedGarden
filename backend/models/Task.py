from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, String

from bdd import Base


class Task(Base):
    __tablename__ = 'task'
    task_id = Column('task_id', Integer(), primary_key=True, autoincrement=True)
    plot_id = Column('plot_id', Integer(), ForeignKey('plot.plot_id'), nullable=False)
    task_name = Column('task_name', String(300), nullable=False)
    task_description = Column('task_description', String(300), nullable=True)
    task_manager = Column('task_manager', String(300), ForeignKey('account.id'), nullable=True)
    task_state = Column('task_state', String(), nullable=True)
    validation_state = Column('validation_state', String(400), nullable=True)
    completion_state = Column('completion_state', String(400), nullable=True)
    deadline = Column('deadline', String(200), nullable=True)

    account = relationship("Accounts")
    plot = relationship("Plot")

    def __init__(self, plot_id, task_name, task_description, task_manager=None, task_state=None, validation_state=None,
                 completion_state=None, deadline=None):
        self.plot_id = plot_id
        self.task_name = task_name
        self.task_description = task_description
        self.task_manager = task_manager
        self.task_state = task_state
        self.validation_state = validation_state
        self.completion_state = completion_state
        self.deadline = deadline
