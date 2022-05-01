import express from 'express';
import busRoutes from './api/busRoutes';
import userRoutes from './api/userRoutes';

routes.use('/buses', busesRoutes);
routes.use('/users', userRoutes);
routes.use('/routes', busRoutes);

export default routes;
