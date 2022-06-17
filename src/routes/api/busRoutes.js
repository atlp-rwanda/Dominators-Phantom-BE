
import express from 'express';
import {
  addRoute,
  findAll,
  findOne,
  updateRoute,
  removeRoute,
  deleteAll,
} from '../../controllers/RouteController';
import authController from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = express.Router();

router.get(
  '/',
  authController.protect,
  permMiddleware.checkPermission,
  findAll
);
router.get(
  '/:id/',
  authController.protect,
  permMiddleware.checkPermission,
  findOne
);
router.put(
  '/:id/',
  authController.protect,
  permMiddleware.checkPermission,
  updateRoute
);
router.post(
  '/',
  authController.protect,
  permMiddleware.checkPermission,
  addRoute
);
router.delete(
  '/:id',
  authController.protect,
  permMiddleware.checkPermission,
  removeRoute
);
router.delete(
  '/',
  authController.protect,
  permMiddleware.checkPermission,
  deleteAll
);

export default router;

