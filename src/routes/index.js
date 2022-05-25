import express from 'express';
import busRoutes from './api/busRoutes';
import crudBusRoutes from './api/crudBusRoutes';
import userRoutes from './api/userRoutes';
<<<<<<< HEAD
import assignDriver from './api/assignDriverRoutes';
import unassigned from './api/unassignedRoute';
const routes = express.Router();
=======
>>>>>>> 7f55af9 (ft crud operation for bus:)

const routes = express.Router();
routes.use('/users', userRoutes);
routes.use('/buses', crudBusRoutes);
routes.use('/routes', busRoutes);
<<<<<<< HEAD
routes.use('/assign', assignDriver);
routes.use('/unassigned', unassigned);
=======
>>>>>>> 7f55af9 (ft crud operation for bus:)

export default routes;
