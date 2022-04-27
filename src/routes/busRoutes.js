import { Router } from 'express';
import { addRoute, findAll, findOne, updateRoute, removeRoute, deleteAll } from '../controllers/RouteController.js';
const router = Router();

router.get('/new', findAll);
router.get('/:id/', findOne)
router.put('/:id/', updateRoute)
router.post('/', addRoute);
router.delete('/:id', removeRoute);
router.delete('/all/delete', deleteAll);

export const busRoutes = router;