import express from 'express';
import {
  addRoute,
  findAll,
  findOne,
  updateRoute,
  removeRoute,
  deleteAll,
} from '../../controllers/RouteController';
import { protect, restrictTo } from '../../controllers/authController';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'operator'));

router.get('/', findAll);
router.get('/:id/', findOne);
router.put('/:id/', updateRoute);
router.post('/', addRoute);
router.delete('/:id', removeRoute);
router.delete('/', deleteAll);

export default router;