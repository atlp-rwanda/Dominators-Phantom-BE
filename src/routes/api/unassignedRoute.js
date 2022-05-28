import express from 'express';
import authController from '../../controllers/authController';
import { getAllDriverUnAssigned } from '../../controllers/assignController';
const router = express.Router();
router.get(
  '/',
  authController.protect,
  authController.IsOperator,
  getAllDriverUnAssigned
);

export default router;
