from sqlalchemy import Column
from sqlalchemy.types import Integer, String

from bdd import Base


class Task(Base):
    __tablename__ = 'task'
    task_id = Column('task_id', Integer, primary_key=True)
    task_name = Column('task_name', String(300), nullable=False)
    task_manager = Column('task_manager', String(300), nullable=False)
    task_state = Column('task_state', String(), nullable=True)
    validation_state = Column('validation_state', String(400), nullable=True)
    completion_state = Column('completion_state', String(400), nullable=True)
    deadline = Column('deadline', String(200), nullable=True)

    def __init__(self, task_id, task_name, task_manager, task_state, validation_state, completion_state, deadline):
        self.task_id = task_id
        self.task_name = task_name
        self.task_manager = task_manager
        self.task_state = task_state
        self.validation_state = validation_state
        self.completion_state = completion_state
        self.deadline = deadline
