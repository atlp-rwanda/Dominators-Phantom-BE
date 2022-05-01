import express from 'express';
import userRoutes from './api/userRoutes';
import busesRoutes from './api/busesRoutes';

const routes = express.Router();

routes.use('/buses', busesRoutes);
routes.use('/users', userRoutes);


export default routes;
