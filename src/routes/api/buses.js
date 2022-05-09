import { Router } from 'express';
import { addBus, findAll, findOne, updateBus, removeBus, deleteAll } from '../../controllers/busController';
const router = Router();
import { authUser } from '../../middlewares/auth';

router.get('/', authUser, findAll);
router.get('/:id/', authUser, findOne);
router.patch('/:id/', authUser, updateBus);
router.post('/', authUser, addBus);
router.delete('/:id', authUser, removeBus);
router.delete('/', authUser, deleteAll);

export const buses = router;