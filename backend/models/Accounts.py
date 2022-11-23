from sqlalchemy import Column
from sqlalchemy.types import Integer, String

from bdd import Base


class Accounts(Base):
    __tablename__ = 'account'
    email = Column('email', String(600), primary_key=True)
    username = Column('username', String(300), nullable=False)
    name = Column('name', String(200), nullable=False)
    password = Column('password', String(), nullable=False)
    address = Column('address', String(), nullable=True)
    profile_picture = Column('profile_picture', String(200), nullable=True)

    def __init__(self, username, name, password, email, address=None, profile_picture=None):
        self.username = username
        self.name = name
        self.password = password
        self.email = email
        self.address = address
        self.profile_picture = profile_picture

# """def init_db():
#   db.drop_all()
#   db.create_all()
#  session.add(Accounts("Sac à merde", "Noé Steiner", "noe.steiner@telecomnancy.eu", "1234", 0, "dans ton cul"))
#  session.commit()
# lg.warning('Database initialized!')""
