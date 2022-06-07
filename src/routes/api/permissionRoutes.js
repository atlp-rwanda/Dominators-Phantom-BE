import express from 'express';
import {
  addPermission,
  findAllPermissions,
  findOnePermission,
  updatePermission,
  deletePermission,
} from '../../controllers/permissionsController';
import authController from '../../controllers/authController';

const router = express.Router();

router.post('/', authController.protect, addPermission);
router.get('/', authController.protect, findAllPermissions);
router.get('/:id', authController.protect, findOnePermission);
router.patch('/:id', authController.protect, updatePermission);
router.delete('/:id', authController.protect, deletePermission);

export default router;
