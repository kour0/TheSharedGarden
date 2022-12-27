import copy
import numpy as np


def trouver_points_d_eau(potager, n, m, potager_voulue):

    def est_valide(i, j):
        # Vérifie si la case (i, j) est valide pour y placer un point d'eau
        return 0 <= i < n and 0 <= j < m and potager[i][j] == 1

    def backtrack(potager_clean, i, j, points_d_eau_clean, taille_optimale):
        global potager_voulue
        potager = np.copy(potager_clean)
        points_d_eau = points_d_eau_clean.copy()
        # Vérifie si on a parcouru toutes les cases du potager
        if taille_optimale <= len(points_d_eau):
            return float('inf'), float('inf')
        if i == n and j == m:
            # Si oui, vérifie si toutes les plantes ont été arrosées par rapport à la potager_voulue
            for i in range(n):
                for j in range(m):
                    if potager[i][j] < potager_voulue[i][j]:
                        return float('inf'), float('inf')
            if taille_optimale > len(points_d_eau):
                taille_optimale = len(points_d_eau)
            # Si toutes les plantes ont été arrosées, on retourne le nombre de points d'eau utilisés
            return points_d_eau, taille_optimale

        # Si on a parcouru toutes les colonnes de la ligne i, on passe à la ligne suivante
        if j == m:
            i += 1
            j = 0

        # On essaie de ne pas mettre de point d'eau sur la case (i, j)
        solution, taille_optimale_potentielle = backtrack(potager, i, j + 1, points_d_eau, taille_optimale)
        if taille_optimale_potentielle < taille_optimale:
            taille_optimale = taille_optimale_potentielle

        # Si la case (i, j) est valide pour y placer un point d'eau, on essaie cette solution
        if est_valide(i, j):
            points_d_eau.append((i, j))
            # On marque la case (i, j) et les cases autour comme arrosées
            for x in range(i - 1, i + 2):
                for y in range(j - 1, j + 2):
                    if est_valide(x, y):
                        potager[x][y] += 1
            solution_avec_point_d_eau, taille_optimale_potentielle = backtrack(potager, i, j + 1, points_d_eau, taille_optimale)
            if taille_optimale_potentielle < taille_optimale:
                taille_optimale = taille_optimale_potentielle
            # # On annule les modifications apportées à la grille
            # for x in range(i - 1, i + 2):
            #     for y in range(j - 1, j + 2):
            #         if est_valide(x, y):
            #             potager[x][y] = 1
            # points_d_eau.pop()
            # On retient la solution la plus optimale
            if solution_avec_point_d_eau != float("inf"):
                if solution != float("inf"):
                    if len(solution_avec_point_d_eau) < len(solution):
                        solution = solution_avec_point_d_eau
                else:
                    solution = solution_avec_point_d_eau
        return solution, taille_optimale

    return backtrack(potager, 0, 0, [], float('inf'))


# Exemple de potager de dimensions 5x5
potager = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
]


potager = np.array(potager)
n, m = potager.shape

potager_voulue = np.array([
    [2, 3, 2, 3, 2],
    [2, 2, 2, 2, 2],
    [2, 4, 3, 4, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 2, 3, 2]
])

# On trouve le nombre minimum de points d'eau nécessaires
points_d_eau, _ = trouver_points_d_eau(potager, n, m, potager_voulue)

if points_d_eau == float("inf"):
    print("Aucune solution n'a été trouvée")
else:
    print("Points d'eau nécessaires :", points_d_eau)
