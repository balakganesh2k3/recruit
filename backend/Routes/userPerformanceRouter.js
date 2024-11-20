import express from 'express';
import { getUserPerformance, upsertUserPerformance } from '../Controllers/userPerformanceController.js';

const router = express.Router();

// Route to fetch user performance data
router.get('/:userId', getUserPerformance);

// Route to add or update performance data
router.post('/', upsertUserPerformance);

export default router;
