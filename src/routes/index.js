import express from 'express';
import busesRoutes from './api/busesRoutes';
import userRoutes from './api/userRoutes';

routes.use('/buses', busesRoutes);
routes.use('/users', userRoutes);

export default routes;
