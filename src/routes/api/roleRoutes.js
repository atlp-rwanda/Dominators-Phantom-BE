import express from 'express';
import {
  addRole,
  findAllRoles,
  findOneRole,
  updateRole,
  deleteRole
} from '../../controllers/rolesController';
import authController from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.post('/', authController.protect, addRole);
router.get('/', authController.protect, permMiddleware.checkPermission, findAllRoles);
router.get('/:id', authController.protect, findOneRole);
router.patch('/:id', authController.protect, updateRole);
router.delete('/:id', authController.protect, deleteRole);

export default router;
