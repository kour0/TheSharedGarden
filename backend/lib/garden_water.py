from gurobipy import *
import numpy as np
import gurobipy as gp


def solveur_sources(M):
    # Create a new model
    m = gp.Model("sources")
    longueur = len(M)
    # Create variables
    X = m.addMVar(longueur * longueur, vtype=GRB.BINARY, name="X")

    # Construction de la matrice des contraintes C
    C = []
    for i in range(longueur):
        for j in range(longueur):
            if M[i, j] >= 1:
                add = [0 for m in range(longueur * longueur)]
                for k in range(-1, 2):
                    for l in range(-1, 2):
                        if 0 <= i + k < longueur and 0 <= j + l < longueur:
                            add[(i + k) * longueur + j + l] = 1
                # On ajoute add au tableau numpy C
                C.append(add)
    C = np.array(C)
    # Construction de la matrice B
    B = []
    for i in range(longueur):
        for j in range(longueur):
            if M[i, j] >= 1:
                B.append(M[i, j])
    B = np.array(B)
    # On ajoute la contrainte
    m.addConstr(C @ X >= B, name="contrainte_des_légumes")

    # Set objective
    m.setObjective(X.sum(), GRB.MINIMIZE)

    # Optimize model
    m.optimize()

    # Print solution
    if m.status == GRB.Status.OPTIMAL:
        X_opt = np.array(m.X)

        # Mise en forme de la solution sous forme de matrice longueur*longueur
        X_opt = X_opt.reshape(longueur, longueur)

        watersUnit = []
        for i in range(longueur):
            for j in range(longueur):
                if X_opt[i, j] == 1:
                    watersUnit.append({'x': i, 'y': j})
        return watersUnit
    else:
        return None
