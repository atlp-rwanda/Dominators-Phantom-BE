import { Router } from 'express';
import { addBus, findAll, findOne, updateBus, removeBus, deleteAll } from '../../controllers/busController';
const router = Router();

router.get('/', findAll);
router.get('/:id/', findOne);
router.patch('/:id/', updateBus);
router.post('/', addBus);
router.delete('/:id', removeBus);
router.delete('/', deleteAll);

export const buses = router;