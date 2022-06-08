
import express from 'express';
import { addRoute, findAll, findOne, updateRoute, removeRoute, deleteAll } from '../../controllers/RouteController.js';
import {protect} from '../../controllers/authController';
import checkToken from '../../middlewares/checkToken.js';
const router = express.Router();

router.get('/',checkToken, protect, findAll);
router.get('/:id/', protect, findOne);
router.put('/:id/', protect, updateRoute);
router.post('/', protect, addRoute);
router.delete('/:id', protect, removeRoute);
router.delete('/', protect, deleteAll);

export default router;

