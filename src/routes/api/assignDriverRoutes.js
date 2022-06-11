import express from 'express';
import authController from '../../controllers/authController';
import {
  findOneAssign,
  getAllDriverAssignToBuses,
  PostAssignDriverToBuses,
  UnAssignDriver,
  UpdateOneAssign,
} from '../../controllers/assignController';
const router = express.Router();

router.get(
  '/',
  authController.protect,
  authController.UserOperator,
  getAllDriverAssignToBuses
);
router.post(
  '/bus/:busId/driver/:driverId',
  authController.protect,
  authController.UserOperator,
  PostAssignDriverToBuses
);
router.get(
  '/:id',
  authController.protect,
  authController.UserOperator,
  findOneAssign
);
router.patch(
  '/:id',
  authController.protect,
  authController.UserOperator,
  UpdateOneAssign
);
router.delete(
  '/:id',
  authController.protect,
  authController.UserOperator,
  UnAssignDriver
);
export default router;
