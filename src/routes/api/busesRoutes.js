import { Router } from 'express';
import { addBus, findAll, findOne, updateBus, removeBus, deleteAll } from '../../controllers/busController';
import paginatedResult from "../../utils/busPagination"
import model from '../../database/models'
import Op from 'sequelize';
import authController from '../../controllers/authController';
const buses = model.Bus;
const router = Router();

router.get('/', paginatedResult(buses),authController.protect, findAll);
router.get('/:id/',authController.protect, findOne);
router.patch('/:id/',authController.protect, updateBus);
router.post('/', authController.protect, addBus);
router.delete('/:id', authController.protect, removeBus);
router.delete('/', authController.protect, deleteAll);

export default router;