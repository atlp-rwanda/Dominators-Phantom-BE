import express from 'express';
import {
    assignPermissionToRole,
    findAllPermissionOnRole,
    findOnePermissionOnRole,
    removeOnePermissionOnRole
} from '../../controllers/rolepermissionController';
import authController from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.post('/:roleId/permissions', authController.protect, assignPermissionToRole);
router.get('/:roleId/permissions', authController.protect, permMiddleware.checkPermission, findAllPermissionOnRole);
router.get('/:roleId/permissions/:permissionId', authController.protect, findOnePermissionOnRole);
router.delete('/:roleId/permissions/:permissionId', authController.protect, removeOnePermissionOnRole);

export default router;