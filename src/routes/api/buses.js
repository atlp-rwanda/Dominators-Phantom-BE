import { Router } from 'express';
import { addBus, findAll, findOne, updateBus, removeBus, deleteAll } from '../../controllers/busController';
const router = Router();

router.get('/', findAll);
router.get('/:id/', findOne)
router.put('/:id/', updateBus)
router.post('/', addBus);
router.delete('/:id', removeBus);
router.delete('/all/delete', deleteAll);

export const buses = router;