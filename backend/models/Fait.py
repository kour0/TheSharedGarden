from sqlalchemy import Column
from sqlalchemy.types import String, Integer

from bdd import Base

class Fait(Base):
    __tablename__ = 'fait'
    username = Column('username', String(300), primary_key=True)
    task_id = Column('task_id', Integer, nullable=False)

    def __init__(self, username, task_id):
        self.username = username
        self.task_id = task_id
