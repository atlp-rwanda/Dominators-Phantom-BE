import express from 'express';
import { enquireBusInfo } from '../../controllers/businfoContoller';
import { protect } from '../../controllers/authController';

const router = express.Router();

router.get('/:id', protect, enquireBusInfo);

export default router;