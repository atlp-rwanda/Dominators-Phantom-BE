import express from 'express';
import {
  getAllNotifications,
  patchDriverViewNotification,
} from '../../controllers/assignController';
const router = express.Router();
router.get('/', getAllNotifications);
router.patch('/:notificationId', patchDriverViewNotification);
export default router;
