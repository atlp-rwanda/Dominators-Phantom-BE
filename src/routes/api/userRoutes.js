import express from 'express';
import { login, protect, restrictTo } from '../../controllers/authController';
import {
  addUser,
  allUsers,
  findOneUser,
  update,
  deleteUser,
} from '../../controllers/usersController';

const router = express.Router();

router.post('/login', login);

router.use(protect);
router.use(restrictTo('admin'));

router.post('/register', addUser);
router.get('/', allUsers);
router.get('/:id', findOneUser);
router.patch('/:id', update);
router.delete('/:id', deleteUser);

export default router;