import { Router } from 'express';
import { 
    findAll, 
    findOne, 
} from '../../controllers/routeListController.js';

const router = Router();


router.get('/', findAll);
router.get('/:id/', findOne)

export const routeList = router;