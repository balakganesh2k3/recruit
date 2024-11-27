import { gemini } from '../Controllers/geminiController.js';
import express from 'express';
const router = express.Router();

router.post('/', gemini);

export default router;