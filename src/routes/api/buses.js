import { Router } from 'express';
import { addBus, findAll, findOne, updateBus, removeBus, deleteAll } from '../../controllers/busController';
const router = Router();
import { protect, restrictTo } from '../../controllers/authController';

router.use(protect);
router.use(restrictTo('admin', 'operator'));

router.get('/', findAll);
router.get('/:id/', findOne);
router.patch('/:id/', updateBus);
router.post('/', addBus);
router.delete('/:id', removeBus);
router.delete('/', deleteAll);

export const buses = router;