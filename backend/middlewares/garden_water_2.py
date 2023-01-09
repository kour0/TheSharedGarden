import numpy as np

# unit = { x,y, besoin, water}

# unitTerre = {x,y,0,0}
# unitPlante = {x,y,1,0}
# unitHerbe = None

taillePotager = 6

potager = np.array([
    [{'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}],
    [{'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}],
    [{'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}],
    [{'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}],
    [{'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}],
    [{'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}, {'besoin': 1, 'water':0}],
])

def aBesoinEau(unit):
    return unit['besoin'] > unit['water']   

def unitProche(x,y,potager):
    units = []

    for i in range(x - 1, x + 2):
            for j in range(y - 1, y + 2):
                if i >= 0 and i < taillePotager and j >= 0 and j < taillePotager :
                    if potager[i,j] != None : 
                        units.append(potager[i,j])
    return units
 
def pointEauUtile(unit,unitsProche):

    if unit != None:
        for unitProche in unitsProche :
            if aBesoinEau(unitProche):
                return True

    return False

def placerPointEau(unitsProche,pointsEau,i,j):
    unitArroser = 0
    for unitProche in unitsProche :
        if aBesoinEau(unitProche):
            unitProche['water'] += 1
            unitArroser += 1
    pointsEauAux = pointsEau.copy()
    pointsEauAux.append((i,j))
    return pointsEauAux, unitArroser

def trouverPointsEau(potager, unitAArroser):


    def aux(i,j,pointsEau, unitArroser):
        print(i,j,pointsEau, unitArroser)

        if unitAArroser == unitArroser:
                print(len(pointsEau))
                return pointsEau
        elif i == taillePotager - 1 and j == taillePotager - 1 :
                return None

        unit = potager[i,j]
        unitsProche = unitProche(i,j, potager)

        if j == taillePotager - 1:
            j = 0
            i += 1
        else:
            j += 1

        if pointEauUtile(unit, unitsProche):
            pointsEau1, unitArroser1 = placerPointEau(unitsProche, pointsEau, i, j)
            
            sol1 = aux(i,j,pointsEau1, unitArroser + unitArroser1)
            sol2 = aux(i,j,pointsEau, unitArroser)

            if sol1 != None and sol2 != None:
                return sol1 if len(sol1) < len(sol2) else sol2
            elif sol1 != None:
                return sol1
            else :
                return sol2
                
        else:
            sol = aux(i,j,pointsEau, unitArroser)
            return sol


    return aux(0,0,[],0)


print(len(trouverPointsEau(potager, 36)))
