import { Router } from 'express';
import busRoutes from './api/busRoutes';
import userRoutes from './api/userRoutes';
const router = Router();

router.use('/users', userRoutes);

router.use('/routes', busRoutes);


export const appRoutes = router;
