<<<<<<< HEAD
import express from 'express';
import busRoutes from './api/busRoutes';
import userRoutes from './api/userRoutes';
const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/routes', busRoutes);


export default routes;
=======
import { Router } from 'express';
import busRoutes from './api/busRoutes';
import userRoutes from './api/userRoutes';
const router = Router();

router.use('/users', userRoutes);

router.use('/routes', busRoutes);


export const appRoutes = router;
>>>>>>> 3ede931 (crud route tests)
