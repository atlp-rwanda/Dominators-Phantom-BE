import express from 'express';
import authController from '../../controllers/authController';
import { passwordManager } from '../../controllers/passwordController';
import {
  addUser,
  allUsers,
  findOneUser,
  update,
  deleteUser,
} from '../../controllers/usersController';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.protect, addUser);
router.post('/reset', passwordManager.verifyEmail);
router.post('/reset/:id', passwordManager.resetPassword);
router.get('/', authController.protect, allUsers);
router.get('/:id', authController.protect, findOneUser);
router.put('/:id', authController.protect, update);
router.delete('/:id', authController.protect, deleteUser);

export default router;