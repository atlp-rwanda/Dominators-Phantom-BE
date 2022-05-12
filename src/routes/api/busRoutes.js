import { Router } from 'express';
import { 
    addRoute, 
    findAll, 
    findOne, 
    updateRoute, 
    removeRoute, 
    deleteAll 
} from '../../controllers/RouteController.js';
import authController from '../../controllers/authController';

const router = Router();

router.get('/', authController.protect, findAll);
router.get('/:id/', authController.protect, findOne)
router.put('/:id/', authController.protect, updateRoute)
router.post('/', authController.protect, addRoute);
router.delete('/:id', authController.protect, removeRoute);
router.delete('/', authController.protect, deleteAll);

export const busRoutes = router;