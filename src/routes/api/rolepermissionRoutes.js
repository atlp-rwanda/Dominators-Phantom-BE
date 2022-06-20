import express from 'express';
import {
  assignPermissionToRole,
  findAllPermissionOnRole,
  findOnePermissionOnRole,
  removeAllPermissionOnRole,
  removeOnePermissionOnRole,
} from '../../controllers/rolepermissionController';
import authController from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.post(
  '/:roleId/permissions',
  authController.protect,
  permMiddleware.checkPermission,
  assignPermissionToRole
);
router.get(
  '/:roleId/permissions',
  authController.protect,
  permMiddleware.checkPermission,
  findAllPermissionOnRole
);
router.get(
  '/:roleId/permissions/:permissionId',
  authController.protect,
  permMiddleware.checkPermission,
  findOnePermissionOnRole
);
router.delete(
  '/:roleId/permissions/:permissionId',
  authController.protect,
  permMiddleware.checkPermission,
  removeOnePermissionOnRole
);
router.delete(
  '/:roleId/permissions/',
  authController.protect,
  permMiddleware.checkPermission,
  removeAllPermissionOnRole
);

export default router;
