from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import String
from sqlalchemy.orm import relationship

from bdd import Base


class Link(Base):
    __tablename__ = 'link'
    account_id = Column('account_id', String(300), ForeignKey('account.id'), primary_key=True)
    garden_name = Column('garden_id', String(300),ForeignKey('garden.id_garden'), primary_key=True)

    account = relationship("Accounts")
    garden = relationship("Garden")

    def __init__(self, account_id, garden_id):
        self.account_id = account_id
        self.garden_id = garden_id
