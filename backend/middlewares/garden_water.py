from copy import deepcopy
from time import time

import numpy as np


def trouver_points_d_eau(potager, n, m, potager_voulue, parcelle_a_arroser):
    def est_valide(i, j, potager):
        # Vérifie si la case (i, j) est valide pour y placer un point d'eau
        if 0 <= i < n and 0 <= j < m and potager[i][j] >= potager_voulue[i][j] > 1:
            return False
        if 0 <= i < n and 0 <= j < m and potager_voulue[i][j] == 1:
            test = False
            for k in range(i - 1, i + 2):
                for l in range(j - 1, j + 2):
                    test = test or (0 <= k < n and 0 <= l < m and potager_voulue[k][l] > 1)
            return test
        return 0 <= i < n and 0 <= j < m and potager_voulue[i][j] > 0

    def backtrack(potager_clean, i, j, points_d_eau_clean, taille_optimale, parcelle_arrosee):
        global potager_voulue
        # Vérifie si on a parcouru toutes les cases du potager
        if taille_optimale <= len(points_d_eau_clean):
            return float('inf'), float('inf')
        if i == n and j == m:
            # Si oui, vérifie si toutes les plantes ont été arrosées par rapport à la potager_voulue
            if parcelle_arrosee != parcelle_a_arroser:
                return float('inf'), float('inf')
            taille_optimale = len(points_d_eau_clean)
            # Si toutes les plantes ont été arrosées, on retourne le nombre de points d'eau utilisés
            return points_d_eau_clean, taille_optimale

        # Si on a parcouru toutes les colonnes de la ligne i, on passe à la ligne suivante
        if j == m:
            i += 1
            j = 0

        solution = float('inf')

        # Si la case (i, j) est valide pour y placer un point d'eau, on essaie cette solution
        if est_valide(i, j, potager_clean):
            points_d_eau = deepcopy(points_d_eau_clean)
            points_d_eau.append((i, j))
            # On marque la case (i, j) et les cases autour comme arrosées
            for x in range(i - 1, i + 2):
                for y in range(j - 1, j + 2):
                    if (x == i and y == j) or (0 <= x < n and 0 <= y < m and potager_voulue[i][j] > 1):
                        potager[x][y] += 1
                        if potager[x][y] == potager_voulue[x][y]:
                            parcelle_arrosee += 1
            solution_avec_point_d_eau, taille_optimale_potentielle = backtrack(potager, i, j + 1, points_d_eau
                                                                               , taille_optimale, parcelle_arrosee)
            if taille_optimale_potentielle < taille_optimale:
                taille_optimale = taille_optimale_potentielle
                solution = solution_avec_point_d_eau
            # On démarque la case (i, j) et les cases autour
            for x in range(i - 1, i + 2):
                for y in range(j - 1, j + 2):
                    if (x == i and y == j) or (0 <= x < n and 0 <= y < m and potager_voulue[i][j] > 1):
                        potager[x][y] -= 1
                        if potager[x][y] + 1 == potager_voulue[x][y]:
                            parcelle_arrosee -= 1
            # On essaie de ne pas placer de point d'eau à la case (i, j)
            solution_sans_point_d_eau, taille_optimale_potentielle = backtrack(potager, i, j + 1, points_d_eau_clean,
                                                                               taille_optimale, parcelle_arrosee)
            if taille_optimale_potentielle < taille_optimale:
                taille_optimale = taille_optimale_potentielle
                solution = solution_sans_point_d_eau
        # Si la case (i, j) n'est pas valide pour y placer un point d'eau, on essaie de ne pas placer de point d'eau
        # à la case (i, j)
        else:
            # On essaie la solution sans point d'eau
            solution_sans_point_d_eau, taille_optimale_potentielle = backtrack(potager_clean, i, j + 1,
                                                                               points_d_eau_clean, taille_optimale,
                                                                               parcelle_arrosee)
            if taille_optimale_potentielle != float('inf') and taille_optimale_potentielle < taille_optimale:
                taille_optimale = taille_optimale_potentielle
                solution = solution_sans_point_d_eau
        return solution, taille_optimale

    return backtrack(potager, 0, 0, [], 18, 0)


# Exemple de potager de dimensions 6x6
potager = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
]

potager = np.array(potager)
n, m = potager.shape

potager_voulue = np.array([
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 3, 2],
    [2, 2, 2, 2, 2, 2]
])

# On trouve le nombre minimum de points d'eau nécessaires
# On mesure le temps d'exécution de l'algorithme
nombre_parcelles_a_arroser = np.sum(potager_voulue > 1)
start = time()
points_d_eau, _ = trouver_points_d_eau(potager, n, m, potager_voulue, nombre_parcelles_a_arroser)
end = time()
print(end - start)

if points_d_eau == float("inf"):
    print("Aucune solution n'a été trouvée")
else:
    print("Points d'eau nécessaires :", points_d_eau)
