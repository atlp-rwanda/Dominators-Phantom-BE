<<<<<<< HEAD
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
=======
import { Router } from 'express';
import { addRoute, findAll, findOne, updateRoute, removeRoute, deleteAll } from '../../controllers/RouteController.js';
import { authUser } from '../../middlewares/auth';
const router = Router();

router.get('/', authUser, findAll);
router.get('/:id/', authUser, findOne);
router.put('/:id/', authUser, updateRoute);
router.post('/', authUser, addRoute);
router.delete('/:id', authUser, removeRoute);
router.delete('/', authUser, deleteAll);

export default router;
>>>>>>> 3ede931... crud route tests
