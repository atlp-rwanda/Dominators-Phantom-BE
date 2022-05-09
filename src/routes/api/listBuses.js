import { Router } from 'express';
import { 
    findAll, 
    findOne, 
} from '../../controllers/busListController.js';

const router = Router();


router.get('/', findAll);
router.get('/:id/', findOne)

export const busList = router;