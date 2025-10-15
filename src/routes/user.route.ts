// Importation du module Router d'Express pour gérer les routes
import { Router } from 'express';
// Importation des contrôleurs qui gèrent la logique métier pour les utilisateurs
import { getUsers, addUser, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
// Création d'un routeur Express
const router = Router();
/**
* Route GET /users
* Description : Récupère la liste des utilisateurs
* Contrôleur associé : getUsers (défini dans user.controller.ts)
*/
router.get('/', getUsers);

/**
* Route POST /users
* Description : Ajoute un nouvel utilisateur
* Contrôleur associé : addUser (défini dans user.controller.ts)
*/
router.post('/', addUser);

/**
 * Route GET /users/:id
 * Description: Récupère un utilisateur spécifique par son id
 */
router.get('/:id', getUserById);

/**
 * Route PUT /users/:id
 * Description: Met à jour un utilisateur spécifique par son id
 */
router.put('/:id', updateUser);

/**
 * Route DELETE /users/:id
 * Description: Supprime un utilisateur spécifique
 */
router.delete('/:id', deleteUser)


// Exportation du routeur pour l'utiliser dans index.ts
export default router;