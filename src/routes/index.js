import express from 'express';
import userRoutes from './api/userRoutes';
import {busRoutes}  from './api/busRoutes';
import {buses} from './api/buses';
import {routeList} from './api/listRoutes';
import {busList} from './api/listBuses'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/routes', busRoutes);
router.use('/buses', buses);
router.use('/routelist', routeList);
router.use('/buslist', busList);

router.use('/users', userRoutes);

export const routes = router;
