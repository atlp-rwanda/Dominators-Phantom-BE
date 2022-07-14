import express from 'express';
import { protect, UserOperator } from '../../controllers/authController';
import { getAllDriverUnAssigned } from '../../controllers/assignController';
const router = express.Router();
router.get('/', protect, UserOperator, getAllDriverUnAssigned);

export default router;
