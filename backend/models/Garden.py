from sqlalchemy import Column
from sqlalchemy.types import String

from bdd import Base

class Garden(Base):
    __tablename__ = 'garden'
    garden_name = Column('garden_name', String(300), primary_key=True)
    owner = Column('owner', String(300), nullable=False)
    manager = Column('manager', String(300), nullable=False)
    garden_type = Column('garden_type', String(300), nullable=False)
    street_address = Column('street_address', String(300), nullable=False)
    country = Column('country', String(300), nullable=False)
    city = Column('city', String(300), nullable=False)
    province = Column('province', String(300), nullable=False)
    postal_code = Column('postal_code', String(300), nullable=False)

    def __init__(self, owner, garden_name, manager, garden_type, street_address, country, city, province, postal_code):
        self.owner = owner
        self.garden_name = garden_name
        self.manager = manager
        self.garden_type = garden_type
        self.street_address = street_address
        self.country = country
        self.city = city
        self.province = province
        self.postal_code = postal_code
