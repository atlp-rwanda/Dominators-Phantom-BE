import express from 'express';
import {login, protect, logout} from '../../controllers/authController';
import { passwordManager } from '../../controllers/passwordController';
import {
  addUser,
  allUsers,
  findOneUser,
  update,
  deleteUser,
} from '../../controllers/usersController';
import checkToken from '../../middlewares/checkToken';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.post('/login', login);
router.post('/register', protect, addUser);
router.post('/reset', passwordManager.verifyEmail);
router.post('/reset/:id', passwordManager.resetPassword);
router.get(
  '/',
  protect,
  permMiddleware.checkPermission,
  allUsers
);
router.get('/:id', protect, findOneUser);
router.put('/:id', protect, update);
router.delete(
  '/:id',
  protect,
  permMiddleware.checkPermission,
  deleteUser
);
router.post('/logout',checkToken, logout)

export default router;