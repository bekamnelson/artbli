DOCUMENTATION TECHNIQUE - ARTBLI
1. Présentation du Projet
ARTBLI est une application web Fullstack de location de livres.
 	Frontend : React.js (Interface utilisateur, SPA)
 	Backend : Laravel (PHP) (API RESTful)
 	Base de données : MySQL
2. Prérequis Techniques
Pour faire tourner ce projet en local, vous devez avoir installé sur votre machine :
o	Node.js et npm (pour le Frontend React)
o	PHP (v8.0 ou supérieur) et Composer (pour le Backend Laravel)
o	XAMPP / WAMP / MAMP (pour le serveur local et la base de données MySQL)

3. Guide d'Installation en Local
A. Configuration du Backend (Laravel)
•	Ouvrez un terminal et placez-vous dans le dossier du backend.
•	Installez les dépendances PHP :
	Composer Install
•	Copiez le fichier d'environnement et générez la clé de l'application :
	Dans le fichier .env, configurez la connexion à votre base de données MySQL :
codeEnv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=artbli
DB_USERNAME=root
DB_PASSWORD=
•	Lancez les migrations pour créer les tables dans la base de données :
php artisan migrate
•	Démarrez le serveur local Laravel :
	php artisan serve
Le backend tourne désormais sur http://127.0.0.1:8000
B. Configuration du Frontend (React)
•	Ouvrez un nouveau terminal et placez-vous dans le dossier du frontend.
•	Installez les dépendances Node :

	npm install
•	Démarrez le serveur de développement React :
	npm run dev
Le frontend tourne désormais sur http://localhost:3000 (ou 5173)

4. Documentation de l'API (Routes Laravel)
Toutes les requêtes du Frontend vers le Backend utilisent le préfixe /api.
Authentification
POST /api/singup : Création d'un nouveau compte utilisateur.
Body attendu : username, email, password
POST /api/login : Connexion d'un utilisateur.
Body attendu : email, password
Retourne : Les infos de l'utilisateur et un token d'accès.
Catalogue (Livres)
GET /api/livre : Récupère la liste de tous les livres.
GET /api/livre/{id} : Récupère les détails d'un livre spécifique.
POST /api/livre : (Admin) Ajoute un nouveau livre au catalogue.
PUT /api/livre/{id} : (Admin) Modifie les informations d'un livre.
DELETE /api/livre/{id} : (Admin) Supprime un livre du catalogue.
Locations (Emprunts)
POST /api/emprunt : Enregistre la location d'un livre par un utilisateur.
Body attendu : livre_id, utilisateur_id
GET /api/user/{id}/emprunts : Récupère l'historique des livres loués par un utilisateur spécifique.
Utilisateurs (Admin)
GET /api/users : (Admin) Récupère la liste de tous les utilisateurs inscrits.
DELETE /api/users/{id} : (Admin) Supprime un compte utilisateur.

5. Sécurité et Rôles
L'application gère deux types de rôles via la colonne statut de la table utilisateurs :
Client (par défaut) : Peut consulter le catalogue, rechercher des livres, louer un livre et voir son profil.
Admin : Possède les mêmes droits qu'un client, mais a également accès à la route protégée /admin.
Comptes de test :
Administrateur :
Email : nelsonbekam37@gmail.com
Mot de passe : 123456
Note : La protection des routes côté React est assurée par un composant AdminRoute qui vérifie le statut stocké dans le localStorage avant d'autoriser l'affichage du tableau de bord.

6. Déploiement (Production)
L'application est configurée pour être déployée sur des services Cloud :
	Frontend (React) -> Vercel
Le code React est lié à un dépôt GitHub et déployé automatiquement sur Vercel.
Lien : https://artbli.vercel.app/
Backend (Laravel) -> Render
Le code PHP/Laravel est hébergé sur Render en tant que "Web Service".
Lien : https://artbli.onrender.com


