from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer

from bdd import Base


class Do(Base):
    __tablename__ = 'do'
    account_id = Column('username', Integer, ForeignKey('account.id'), primary_key=True)
    task_id = Column('task_id', Integer, ForeignKey('task.task_id'), primary_key=True)

    account = relationship("Accounts")
    task = relationship("Task")

    def __init__(self, account_id, task_id):
        self.account_id = account_id
        self.task_id = task_id
