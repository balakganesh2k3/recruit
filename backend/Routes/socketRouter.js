import { chat } from '../Controllers/socketController.js';
const express = require('express');
const router = express.Router();

router.post('/', chat);

export default router;