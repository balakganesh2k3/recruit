import express from 'express';
import { handleTranscription, getTranscripts } from '../Controllers/speechController.js';
const router = express.Router();

// Route to save transcription
router.post('/', handleTranscription);

// Route to fetch stored transcripts
router.get('/', getTranscripts);

export default router;