import { gemini, feedback } from '../Controllers/geminiController.js';
import express from 'express';
const router = express.Router();

router.post('/', gemini);
router.post('/feedback', feedback);

export default router;