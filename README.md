# TheSharedGarden

TheSharedGarden est une application web moderne qui permet à n'importe qui de créer, rejoindre et gérer facilement un jardin partagé. L'application utilise des technologies de pointe telles que Flask, ReactJS, TailwindUI, SQLAlchemy et Gurobi pour offrir une expérience utilisateur agréable et performante.

## Description du projet

Les enjeux climatiques n’ont jamais été aussi élevés. Notre planète arrive à la fin de ses énergies fossiles. Les ressources deviennent rares, les changements climatiques provoquent des pénuries, des sécheresses et des catastrophes naturelles. Le mode de vie que nous connaissons aujourd’hui doit changer et devenir plus écoresponsable. L’objectif est de changer les habitudes de consommation de produits venants du monde entier en se restreignant à une zone géographique bien plus petite. La politique actuelle serait de privilégier les produits de notre pays mais essayons d’aller plus loin…

En effet, un mode de vie plus judicieux écologiquement serait de revenir à des productions locales en passant directement par les producteurs. Certaines personnes ont une surface de production( jardin, verger) mais n’ont pas le temps ou les moyens de s’en occuper. Tandis que d’autres personnes, n’ont pas de terrain mais sont prêtes à donner de leur temps pour pouvoir consommer localement.

## Fonctionnalités

* Création et gestion de jardins partagés
* Rejoindre des jardins existants
* Gestion des tâches et des responsabilités pour chaque membre du jardin
* Optimisation du placement de sources d'eau dans un jardin à la forme quelconque grâce à un algorithme performant utilisant Gurobi

## Technologies utilisées

* Flask : un micro-framework web Python pour le backend
* ReactJS : une bibliothèque JavaScript pour la création d'interfaces utilisateur pour le frontend
* TailwindUI : une bibliothèque de composants UI pour ReactJS
* SQLAlchemy : une bibliothèque Python pour la gestion de la base de données
* Gurobi : un solveur d'optimisation mathématique pour l'algorithme d'optimisation de placement de sources d'eau

## Installation

1. Clonez le dépôt GitHub :
```
git clone https://github.com/kour0/TheSharedGarden.git
```
2. Créez un environnement virtuel et installez les dépendances pour le backend :
```
cd TheSharedGarden/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
3. Installez les dépendances pour le frontend :
```
cd ../frontend
npm install
```
4. Créez un fichier `.env` dans le répertoire `backend` et ajoutez les variables d'environnement nécessaires pour la connexion à la base de données et l'utilisation de l'API Gurobi ainsi que le JWT_SECRET pour l'authentification.

## Utilisation

1. Démarrez le serveur backend :
```
cd TheSharedGarden/backend
source venv/bin/activate
flask run
```
2. Démarrez le serveur de développement frontend :
```
cd ../frontend
npm run dev -- --host 127.0.0.1
```
3. Ouvrez votre navigateur web et accédez à `http://localhost:3000` pour utiliser l'application.

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à TheSharedGarden, veuillez consulter notre guide de contribution pour plus d'informations.

## Licence

TheSharedGarden est sous licence MIT. Consultez le fichier `LICENSE` pour plus d'informations.
