<<<<<<< HEAD
import express from 'express';
import userRoutes from './api/userRoutes';

const routes = express.Router();

routes.use('/users', userRoutes);

export default routes;
=======
import { Router } from 'express';
import { buses } from './buses';

const router = Router();


router.use('/buses', buses);


export default router;
>>>>>>> b75ff54 (working on create bus)
