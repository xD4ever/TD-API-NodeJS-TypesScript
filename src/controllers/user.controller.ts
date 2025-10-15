// Importation des types Request et Response depuis Express
// Request : représente la requête HTTP reçue
// Response : représente la réponse HTTP envoyée au client
import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

/**
 * GET /users - return all users from the database
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.find().lean();
        res.json(allUsers);
    } catch (err) {
        console.error('getUsers error:', err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

/**
 * POST /users - create a new user in the database
 */
export const addUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body as Partial<IUser>;
        if (!name || !email) {
            return res.status(400).json({ message: 'name and email are required' });
        }

        const exists = await User.findOne({ email }).exec();
        if (exists) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: `Utilisateur ${name} ajouté avec succès !`, user: newUser });
    } catch (err) {
        console.error('addUser error:', err);
        res.status(500).json({ message: 'Failed to add user' });
    }
};

/**
 * GET /users/:id - return a single user by id
 */
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // basic validation for MongoDB ObjectId length
        if (!id || id.length !== 24) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const user = await User.findById(id).lean().exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('getUserById error:', err);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};

/**
 * PUT /users/:id - Màj un utilisateur
 */

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body as Partial<IUser>;
        if (!id || id.length !== 24) {
            return res.status(400).json({ message: 'Invalid user id' });
        }
        if (!name && !email) {
            return res.status(400).json({ message: 'At least one of name or email is required to update' });
        }
        const user = await User.findById(id).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email }).exec();
            if (emailExists) {
                return res.status(409).json({ message: 'Another user with this email already exists' });
            }
            user.email = email;
        }
        if (name) {
            user.name = name;
        }
        await user.save();
        res.json({ message: `Utilisateur ${user.name} mis à jour avec succès !`, user });
    } catch (err) {
        console.error('updateUser error:', err);
        res.status(500).json({ message: 'Failed to update user' });
    }   
};

/**
 * DELETE /users/:id - Supprime un utilisateur
*/
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || id.length !== 24) {
            return res.status(400).json({ message: 'Invalid user id' });
        }
        const user = await User.findByIdAndDelete(id).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `Utilisateur ${user.name} supprimé avec succès !` });
    } catch (err) {
        console.error('deleteUser error:', err);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};