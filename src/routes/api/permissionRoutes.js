import express from 'express';
import {
  addPermission,
  findAllPermissions,
  findOnePermission,
  updatePermission,
  deletePermission,
  deleteAllPermission,
} from '../../controllers/permissionsController';
import { protect } from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.post('/', protect, permMiddleware.checkPermission, addPermission);
router.get(
  '/',
  protect,
  permMiddleware.checkPermission,
  findAllPermissions
);
router.get('/:id', protect, permMiddleware.checkPermission, findOnePermission);
router.patch('/:id', protect, permMiddleware.checkPermission, updatePermission);
router.delete(
  '/:id',
  protect,
  permMiddleware.checkPermission,
  deletePermission
);
router.delete(
  '/',
  protect,
  permMiddleware.checkPermission,
  deleteAllPermission
);

export default router;
