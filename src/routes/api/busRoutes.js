import express from 'express';
import {
  addRoute,
  findAll,
  findOne,
  updateRoute,
  removeRoute,
  deleteAll,
} from '../../controllers/RouteController';
import { protect } from '../../controllers/authController';
import permMiddleware from '../../helpers/checkPermission';
import checkToken from '../../middlewares/checkToken.js';

const router = express.Router();

router.get(
  '/',
  checkToken,
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
router.put(
  '/:id/',
  protect,
  permMiddleware.checkPermission,
  updateRoute
);
router.post(
  '/',
  protect,
  permMiddleware.checkPermission,
  addRoute
);
router.delete(
  '/:id',
  protect,
  permMiddleware.checkPermission,
  removeRoute
);
router.delete(
  '/',
  protect,
  permMiddleware.checkPermission,
  deleteAll
);

export default router;
