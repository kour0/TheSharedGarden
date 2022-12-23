from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String, Integer
from sqlalchemy.orm import relationship

from bdd import Base


class Garden(Base):
    __tablename__ = 'garden'

    id_garden = Column('id_garden', Integer, primary_key=True, autoincrement=True)
    garden_name = Column('garden_name', String(300), unique=True, nullable=False)
    owner = Column('owner', String(300), ForeignKey('account.id'), nullable=False)
    manager = Column('manager', String(300),ForeignKey('account.id'), nullable=False)
    garden_type = Column('garden_type', String(300), nullable=False)
    street_address = Column('street_address', String(300), nullable=False)
    country = Column('country', String(300), nullable=False)
    city = Column('city', String(300), nullable=False)
    province = Column('province', String(300), nullable=False)
    postal_code = Column('postal_code', String(300), nullable=False)

    account = relationship("Accounts", foreign_keys=[owner])
    accountBis = relationship("Accounts", foreign_keys=[manager])


    def __init__(self, garden_name, owner, manager, garden_type, street_address, country, city, province, postal_code):
        self.garden_name = garden_name
        self.owner = owner
        self.manager = manager
        self.garden_type = garden_type
        self.street_address = street_address
        self.country = country
        self.city = city
        self.province = province
        self.postal_code = postal_code
