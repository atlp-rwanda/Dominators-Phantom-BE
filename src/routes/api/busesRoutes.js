import { Router } from 'express';
import { addBus, findAll, findOne, updateBus, removeBus, deleteAll } from '../../controllers/busController';
import paginatedResult from "../../utils/busPagination"
import model from '../../database/models'
import Op from 'sequelize';
const buses = model.Bus;
const router = Router();

router.get('/', paginatedResult(buses), findAll);
router.get('/:id/', findOne);
router.patch('/:id/', updateBus);
router.post('/', addBus);
router.delete('/:id', removeBus);
router.delete('/', deleteAll);

export default router;