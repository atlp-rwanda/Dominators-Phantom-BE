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
import {protect} from '../../controllers/authController';

const buses = model.Bus;
const router = Router();

router.get('/', paginatedResult(buses), protect, findAll);
router.get('/:id/', protect, findOne);
router.patch('/:id/', protect, updateBus);
router.post('/', protect, addBus);
router.delete('/:id', protect, removeBus);
router.delete('/', protect, deleteAll);

export default router;
