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

router.get('/', protect, findAll);
router.get('/:id/', protect, findOne);
router.put('/:id/', protect, updateRoute);
router.post('/', protect, addRoute);
router.delete('/:id', protect, removeRoute);
router.delete('/', protect, deleteAll);

export default router;
