import express from 'express';
import busRoutes from './api/busRoutes';
import userRoutes from './api/userRoutes';

routes.use('/buses', busRoutes);
routes.use('/users', userRoutes);
routes.use('/routes', busRoutes);

export default routes;
