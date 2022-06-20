import express from 'express';
import {
  addPermission,
  findAllPermissions,
  findOnePermission,
  updatePermission,
  deletePermission,
  deleteAllPermission,
} from '../../controllers/permissionsController';
import authController from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.post(
  '/',
  authController.protect,
  permMiddleware.checkPermission,
  addPermission
);
router.get(
  '/',
  authController.protect,
  permMiddleware.checkPermission,
  findAllPermissions
);
router.get(
  '/:id',
  authController.protect,
  permMiddleware.checkPermission,
  findOnePermission
);
router.patch(
  '/:id',
  authController.protect,
  permMiddleware.checkPermission,
  updatePermission
);
router.delete(
  '/:id',
  authController.protect,
  permMiddleware.checkPermission,
  deletePermission
);
router.delete(
  '/',
  authController.protect,
  permMiddleware.checkPermission,
  deleteAllPermission
);

export default router;
