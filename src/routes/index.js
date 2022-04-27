import { Router } from 'express';
import { busRoutes } from './busRoutes';

const router = Router();


router.use('/routes', busRoutes);


export const appRoutes = router;