import express from 'express';
import authController from '../../controllers/authController';
import {
  findOneAssign,
  getAllDriverAssignToBuses,
  PostAssignDriverToBuses,
  UpdateOneAssign,
} from '../../controllers/assignController';
const router = express.Router();

router.get(
  '/',
  authController.protect,
  authController.IsOperator,
  getAllDriverAssignToBuses
);
router.post(
  '/',
  authController.protect,
  authController.IsOperator,
  PostAssignDriverToBuses
);
router.get(
  '/:id',
  authController.protect,
  authController.IsOperator,
  findOneAssign
);
router.patch(
  '/:id',
  authController.protect,
  authController.IsOperator,
  UpdateOneAssign
);
export default router;
