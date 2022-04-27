import express from 'express';
import busRoutes from './api/busRoutes';
import userRoutes from './api/userRoutes';
const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/routes', busRoutes);


export default routes;

