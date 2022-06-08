import express from 'express';
import {protect,UserOperator} from '../../controllers/authController';
import authController from "../../controllers/authController"
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
  protect,
  UserOperator,
  getAllDriverAssignToBuses
);
router.post(
  '/bus/:busId/driver/:driverId',
  protect,
  UserOperator,
  PostAssignDriverToBuses
);
router.get(
  '/:id',
  protect,
  UserOperator,
  findOneAssign
);
router.patch(
  '/:id',
  protect,
 UserOperator,
  UpdateOneAssign
);
router.delete(
  '/:id',
  protect,
  UserOperator,
  UnAssignDriver
);
export default router;
