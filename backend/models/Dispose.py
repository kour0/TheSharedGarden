from sqlalchemy import Column
from sqlalchemy.types import String, Integer

from bdd import Base

class Dispose(Base):
    __tablename__ = 'dispose'
    parcelle_id = Column('parcelle_id', String(300), primary_key=True)
    task_id = Column('task_id', Integer , nullable=False)

    def __init__(self, parcelle_id, task_id):
        self.parcelle_id = parcelle_id
        self.task_id = task_id
