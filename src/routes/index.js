<<<<<<< HEAD
import { Router } from 'express';
import { busRoutes } from './busRoutes';

const router = Router();


router.use('/routes', busRoutes);


export const appRoutes = router;
=======
import express from 'express';
import busRoutes from './api/busRoutes';
import userRoutes from './api/userRoutes';
const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/routes', busRoutes);


export default routes;

>>>>>>> develop
