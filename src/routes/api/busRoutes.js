import { Router } from 'express';
import { 
    addRoute, 
    findAll, 
    findOne, 
    updateRoute, 
    removeRoute, 
    deleteAll 
} from '../../controllers/RouteController.js';
import { authUser } from '../../middlewares/auth';

const router = Router();

router.get('/', authUser, findAll);
router.get('/:id/', authUser, findOne)
router.put('/:id/', authUser, updateRoute)
router.post('/', authUser, addRoute);
router.delete('/:id', authUser, removeRoute);
router.delete('/', authUser, deleteAll);

export const busRoutes = router;