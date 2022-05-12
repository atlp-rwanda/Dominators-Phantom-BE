import { Router } from 'express';
import { addBus, findAll, findOne, updateBus, removeBus, deleteAll } from '../../controllers/busController';
const router = Router();
import authController  from '../../controllers/authController';

router.get('/', authController.protect, findAll);
router.get('/:id/', authController.protect, findOne);
router.patch('/:id/', authController.protect, updateBus);
router.post('/', authController.protect, addBus);
router.delete('/:id', authController.protect, removeBus);
router.delete('/', authController.protect, deleteAll);

export const buses = router;