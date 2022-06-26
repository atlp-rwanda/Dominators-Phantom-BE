import express from 'express';
import {
  addRole,
  findAllRoles,
  findOneRole,
  updateRole,
  deleteRole,
  deleteAllRole,
} from '../../controllers/rolesController';
import { protect } from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.post(
  '/',
  protect,
  permMiddleware.checkPermission,
  addRole
);
router.get(
  '/',
  protect,
  permMiddleware.checkPermission,
  findAllRoles
);
router.get(
  '/:id',
  protect,
  permMiddleware.checkPermission,
  findOneRole
);
router.patch(
  '/:id',
  protect,
  permMiddleware.checkPermission,
  updateRole
);
router.delete(
  '/:id',
  protect,
  permMiddleware.checkPermission,
  deleteRole
);
router.delete(
  '/',
  protect,
  permMiddleware.checkPermission,
  deleteAllRole
);

export default router;
