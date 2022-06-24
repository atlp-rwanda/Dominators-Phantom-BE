import express from 'express';
import busRoutes from './api/busRoutes';
import crudBusRoutes from './api/crudBusRoutes';
import userRoutes from './api/userRoutes';
import permissionRoutes from './api/permissionRoutes';
import roleRoutes from './api/roleRoutes';
import rolePermissionRoutes from './api/rolepermissionRoutes';
import assignDriver from './api/assignDriverRoutes';
import unassigned from './api/unassignedRoute';
import profileRoutes from './api/profileRoutes';

const routes = express.Router();
routes.use('/users', userRoutes, profileRoutes);
routes.use('/buses', crudBusRoutes);
routes.use('/routes', busRoutes);
routes.use('/assign', assignDriver);
routes.use('/unassigned', unassigned);
routes.use('/permissions', permissionRoutes)
routes.use('/roles', roleRoutes)
routes.use('/roles', rolePermissionRoutes)

export default routes;
