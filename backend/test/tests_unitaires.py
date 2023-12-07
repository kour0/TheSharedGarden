# On souhaite tester notre algo garden_water.py en testant plusieurs matrices de potager

from lib.garden_water import solveur_sources
import numpy as np


def test_solveur_sources():
    # Test 1
    # Potager de taille 3x3
    M = np.array([[1, 1, 1],
                  [1, 1, 1],
                  [1, 1, 1]])
    resultat_attendu = len([{'x': 1, 'y': 1}])
    resultat = len(solveur_sources(M))
    assert resultat == resultat_attendu
    # Test 2
    # Potager de taille 6x6
    M = np.array([[1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1],
                  [1, 1, 1, 1, 1, 1]])
    resultat_attendu = len([{'x': 1, 'y': 1}, {'x': 1, 'y': 4}, {'x': 4, 'y': 1}, {'x': 4, 'y': 1}])
    resultat = len(solveur_sources(M))
    assert resultat == resultat_attendu