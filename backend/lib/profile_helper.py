from bdd import Session
from models.Accounts import Accounts

session = Session()

def members_to_json(members):
    return [member_to_json(member) for member in members]

def member_to_json(member):
    account = session.query(Accounts).filter_by(id=member.account_id).first()
    return {
        'id': account.id,
        'username': account.username,
        'email': account.email,
        'first_name': account.first_name,
        'last_name': account.last_name,
    }



