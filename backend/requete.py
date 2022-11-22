from sqlalchemy import create_engine, Column
from sqlalchemy.orm import sessionmaker
from models.Accounts import Accounts
from bdd import Session

session = Session()

def getEmail(email):
  return session.query(Accounts).filter_by(email=email).first()

def testAccounts():
  #session.add(Accounts("username", "name", "password", "email", 90, "adress", "profile_picture")) 
  #session.commit()
  accounts = session.query(Accounts).all()

  for account in accounts:
    print(f'{account.email}')