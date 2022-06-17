import { Router } from 'express';
import {
  addBus,
  findAll,
  findOne,
  updateBus,
  removeBus,
  deleteAll,
} from '../../controllers/busController';
import paginatedResult from '../../utils/busPagination';
import model from '../../database/models';
import authController from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const buses = model.Bus;
const router = Router();

router.get(
  '/',
  paginatedResult(buses),
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
router.patch(
  '/:id/',
  authController.protect,
  permMiddleware.checkPermission,
  updateBus
);
router.post(
  '/',
  authController.protect,
  permMiddleware.checkPermission,
  addBus
);
router.delete(
  '/:id',
  authController.protect,
  permMiddleware.checkPermission,
  removeBus
);
router.delete(
  '/',
  authController.protect,
  permMiddleware.checkPermission,
  deleteAll
);

export default router;
