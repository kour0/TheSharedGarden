from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer

from bdd import Base


class Link(Base):
    __tablename__ = 'link'
    account_id = Column('account_id', Integer(), ForeignKey('account.id'), primary_key=True)
    garden_id = Column('garden_id', Integer(), ForeignKey('garden.id_garden'), primary_key=True)

    account = relationship("Accounts")
    garden = relationship("Garden")

    def __init__(self, account_id, garden_id):
        self.account_id = account_id
        self.garden_id = garden_id
