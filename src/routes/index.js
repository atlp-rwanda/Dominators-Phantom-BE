import express from 'express';
import busRoutes from './api/busRoutes';
import userRoutes from './api/userRoutes';
import assignDriver from './api/assignDriverRoutes';
import unassigned from './api/unassignedRoute';
const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/routes', busRoutes);
routes.use('/assign', assignDriver);
routes.use('/unassigned', unassigned);

export default routes;
