from sqlalchemy import Column
from sqlalchemy.types import String

from bdd import Base

class garden(Base):
    __tablename__ = 'garden'
    owner = Column('owner', String(300), primary_key=True)
    garden_name = Column('garden_name', String(300), nullable=False)
    manager= Column('manager', String(300), nullable=False)
    garden_adress = Column('garden_adress', String(800), nullable=False)

    def __init__(self, owner, garden_name, manager, garden_adress):
        self.owner = owner
        self.garden_name = garden_name
        self.manager = manager
        self.garden_adress = garden_adress
