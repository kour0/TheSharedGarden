import numpy as np

# unit = { x,y, besoin, water}

# unitTerre = {x,y,0,0}
# unitPlante = {x,y,1,0}
# unitHerbe = None

taillePotager = 6

potager = np.array([
    [{'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0},
     {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}],
    [{'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0},
     {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}],
    [{'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0},
     {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}],
    [{'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0},
     {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}],
    [{'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0},
     {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}],
    [{'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0},
     {'besoin': 1, 'water': 0}, {'besoin': 1, 'water': 0}],
])


def aBesoinEau(unit):
    return unit['besoin'] > unit['water']


def getUnitProche(x, y, potager):
    units = []
    for i in range(x - 1, x + 2):
        for j in range(y - 1, y + 2):
            if 0 <= i < taillePotager and 0 <= j < taillePotager:
                if potager[i, j] is not None:
                    units.append(potager[i, j])
    return units


def pointEauUtile(unitsProche):
    for unitProche in unitsProche:
        if aBesoinEau(unitProche):
            return True
    return False


def placerPointEau(pointsEau, i, j, potager):
    unitsProche = getUnitProche(i, j, potager)
    unitArroser = 0
    for unitProche in unitsProche:
        if aBesoinEau(unitProche):
            unitProche['water'] += 1
            unitArroser += 1
    pointsEau.append((i, j))
    return pointsEau, unitArroser


def trouverPointsEau(potagera, unitAArroser):
    def aux(i, j, pointsEau, unitArroser, potager):
        print(i, j, pointsEau, unitArroser)

        if unitAArroser == unitArroser:
            print(len(pointsEau))
            return pointsEau
        elif i == taillePotager - 1 and j == taillePotager:
            return None

        if j == taillePotager:
            j = 0
            i += 1

        # unit = potager[i, j]
        unitsProche = getUnitProche(i, j, potager)

        if pointEauUtile(unitsProche):
            potager1 = np.copy(potager)
            pointsEau1, unitArroser1 = placerPointEau(pointsEau.copy(), i, j, potager1)

            sol1 = aux(i, j+1, pointsEau1, unitArroser + unitArroser1, potager1)
            sol2 = aux(i, j+1, pointsEau, unitArroser, potager)

            if sol1 is not None and sol2 is not None:
                return sol1 if len(sol1) < len(sol2) else sol2
            elif sol1 is not None:
                return sol1
            else:
                return sol2

        else:
            sol = aux(i, j+1, pointsEau, unitArroser, potager)
            return sol

    return aux(0, 0, [], 0, potagera)


print(len(trouverPointsEau(potager, 36)))
