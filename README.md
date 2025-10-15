# API Node.js avec TypeScript

Une API REST simple construite avec Node.js, Express et TypeScript, utilisant MongoDB comme base de données.

## Description

Cette API permet de gérer des utilisateurs. Elle inclut des endpoints pour récupérer, ajouter et obtenir des utilisateurs spécifiques.

## Installation

1. Clonez le dépôt :
   ```
   git clone <url-du-dépôt>
   cd api-node-ts
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet avec les variables d'environnement nécessaires :
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/api-node-ts
   ```

## Utilisation

### Développement
Pour lancer le serveur en mode développement avec rechargement automatique :
```
npm run dev
```

### Production
1. Construisez le projet :
   ```
   npm run build
   ```

2. Lancez le serveur :
   ```
   npm start
   ```

Le serveur démarrera sur `http://localhost:3000` (ou le port défini dans `.env`).

## Endpoints API

### Utilisateurs

- **GET /users** : Récupère la liste de tous les utilisateurs.
- **GET /users/:id** : Récupère un utilisateur spécifique par son ID.
- **POST /users** : Ajoute un nouvel utilisateur. Corps de la requête attendu : `{ "name": "string", "email": "string" }`.

## Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express** : Framework web pour Node.js.
- **TypeScript** : Superset de JavaScript avec typage statique.
- **MongoDB** : Base de données NoSQL.
- **Mongoose** : ODM pour MongoDB.
- **Dotenv** : Gestion des variables d'environnement.

## Scripts disponibles

- `npm run dev` : Lance le serveur en mode développement avec Nodemon.
- `npm run build` : Compile le TypeScript en JavaScript.
- `npm start` : Lance le serveur en production.

## Structure du projet

```
src/
├── controllers/
│   └── user.controller.ts
├── models/
│   └── user.model.ts
├── routes/
│   └── user.route.ts
├── db.ts
├── index.ts
└── nodemon.json
```

## Licence

ISC