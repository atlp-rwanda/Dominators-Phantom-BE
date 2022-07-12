import { Router } from 'express';
import {
  addBus,
  findAll,
  findOne,
  updateBus,
  removeBus,
  deleteAll,
} from '../../controllers/busController';
import { protect } from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';

const router = Router();

router.get(
  '/',
  protect,
  permMiddleware.checkPermission,
  findAll
);
router.get(
  '/:id/',
  protect,
  permMiddleware.checkPermission,
  findOne
);
router.patch(
  '/:id/',
  protect,
  permMiddleware.checkPermission,
  updateBus
);
router.post(
  '/',
  protect,
  permMiddleware.checkPermission,
  addBus
);
router.delete(
  '/:id',
  protect,
  permMiddleware.checkPermission,
  removeBus
);
router.delete(
  '/',
  protect,
  permMiddleware.checkPermission,
  deleteAll
);

export default router;
