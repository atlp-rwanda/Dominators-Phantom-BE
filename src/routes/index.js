import express from 'express';
<<<<<<< HEAD
import userRoutes from './api/userRoutes';

const routes = express.Router();

routes.use('/users', userRoutes);

export default routes;
=======
import { busRoutes } from './busRoutes';
import { userRouter } from './userRoute';

const router = express.Router();

router.use('/routes', busRoutes);
router.use('/register', userRouter);


export const appRoutes = router;
>>>>>>> Added login feature, jwt on a succesful login and documentation
