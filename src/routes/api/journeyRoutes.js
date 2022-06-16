import express from 'express';
import {
  createJourney,
  getJourney,
  slowDown,
  speedUp,
  pauseOrResume,
  stopJourney,
  editJourneyInfo,
  getAllJourneys,
} from '../../controllers/simulateController';
import { checkUser } from '../../helpers/simulate.middleware';

const router = express.Router();

router.post('/start', checkUser, createJourney);
router.get('/:journeyId', checkUser, getJourney);
router.patch('/:journeyId/slowdown', checkUser, slowDown);
router.patch('/:journeyId/speedup', checkUser, speedUp);
router.patch('/:journeyId/pause', checkUser, pauseOrResume);
router.patch('/:journeyId/stop', checkUser, stopJourney);
router.patch('/:journeyId/edit', checkUser, editJourneyInfo);

export default router;
