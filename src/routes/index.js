import express from 'express';
import busRoutes from './api/busRoutes';
import crudBusRoutes from './api/crudBusRoutes';
import userRoutes from './api/userRoutes';

const routes = express.Router();
routes.use('/users', userRoutes);
routes.use('/buses', crudBusRoutes);
routes.use('/routes', busRoutes);

export default routes;

