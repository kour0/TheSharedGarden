from bdd import Session
from models.Accounts import Accounts

session = Session()


def gardens_to_json(gardens):
    return [garden_to_json(garden) for garden in gardens]


def garden_to_json(garden):
    owner = session.query(Accounts).filter_by(id=garden.owner).first()

    return {
        'id': garden.id_garden,
        'name': garden.garden_name,
        'owner': {
            'username': owner.username,
        },
        'manager': garden.manager,
        'type': garden.garden_type,
        'street_address': garden.street_address,
        'city': garden.city,
        'country': garden.country,
        'province': garden.province,
        'postal_code': garden.postal_code,
    }