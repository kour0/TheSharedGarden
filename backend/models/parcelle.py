from sqlalchemy import Column
from sqlalchemy.types import String, Integer

from bdd import Base

class parcelle(Base):
    __tablename__ = 'parcelle'
    parcelle_id = Column('parcelle_id', Integer, primary_key=True)
    parcelle_state = Column('parcelle_state', String(300), nullable=False)
    cultivated_vegetable = Column('cultivated_vegetable', String(300), nullable=False)

    def __init__(self, parcelle_id, parcelle_state, cultivated_vegetable):
        self.parcelle_id = parcelle_id
        self.parcelle_state = parcelle_state
        self.cultivated_vegetable = cultivated_vegetable

