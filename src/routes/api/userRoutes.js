import express from 'express';
import authController from '../../controllers/authController';
<<<<<<< HEAD
import { passwordManager } from '../../controllers/passwordController';
import { addUser, allUsers, findOneUser, update, deleteUser } from '../../controllers/usersController'

=======
import { addUser, allUsers, findOneUser, update, deleteUser } from '../../controllers/usersController'



>>>>>>> 3ede931 (crud route tests)
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.protect, addUser)
<<<<<<< HEAD
router.post('/reset', passwordManager.verifyEmail)
router.post('/reset/:id', passwordManager.resetPassword)
=======
>>>>>>> 3ede931 (crud route tests)
router.get('/', authController.protect, allUsers)
router.get('/:id', authController.protect, findOneUser)
router.put('/:id', authController.protect, update)
router.delete('/:id', authController.protect, deleteUser)

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 3ede931 (crud route tests)
