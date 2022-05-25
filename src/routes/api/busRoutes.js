
import express from 'express';
import {
  addRoute,
  findAll,
  findOne,
  updateRoute,
  removeRoute,
  deleteAll,
} from '../../controllers/RouteController';
import authController from '../../controllers/authController';

const router = express.Router();

router.get('/', authController.protect, findAll);
router.get('/:id/', authController.protect, findOne);
router.put('/:id/', authController.protect, updateRoute);
router.post('/', authController.protect, addRoute);
router.delete('/:id', authController.protect, removeRoute);
router.delete('/', authController.protect, deleteAll);

export default router;
