import express from 'express';
import {
  assignPermissionToRole,
  assignSelectedPermissions,
  findAllPermissionOnRole,
  findOnePermissionOnRole,
  removeAllPermissionOnRole,
  removeOnePermissionOnRole,
  removeSelectedPermission,
} from '../../controllers/rolepermissionController';
import { protect } from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.post(
  '/:roleId/permissions',
  protect,
  permMiddleware.checkPermission,
  assignPermissionToRole
);
router.post(
  '/:roleId/selected',
  protect,
  permMiddleware.checkPermission,
  assignSelectedPermissions
);
router.get(
  '/:roleId/permissions',
  protect,
  permMiddleware.checkPermission,
  findAllPermissionOnRole
);
router.get(
  '/:roleId/permissions/:permissionId',
  protect,
  permMiddleware.checkPermission,
  findOnePermissionOnRole
);
router.delete(
  '/:roleId/permissions/:permissionId',
  protect,
  permMiddleware.checkPermission,
  removeOnePermissionOnRole
);
router.delete(
  '/:roleId/selected',
  protect,
  permMiddleware.checkPermission,
  removeSelectedPermission
);
router.delete(
  '/:roleId/permissions/',
  protect,
  permMiddleware.checkPermission,
  removeAllPermissionOnRole
);

export default router;
