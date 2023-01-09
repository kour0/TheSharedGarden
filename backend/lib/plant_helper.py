def plant_to_json(plant):
    return {
        'id': plant.id,
        'name': plant.name,
        'image': plant.image,
    }


def plants_to_json(plants):
    return [plant_to_json(plant) for plant in plants]
