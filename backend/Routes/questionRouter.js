import express from 'express';
import {
  addQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestionByTag, // Import the new controller
} from '../Controllers/questionController.js';

const questionRouter = express.Router();

questionRouter.post('/', addQuestion); // Add a new question
questionRouter.get('/', getAllQuestions); // Get all questions
questionRouter.get('/tag/:tag', getQuestionByTag); // Get questions by tag
questionRouter.put('/:id', updateQuestion); // Update a question by ID
questionRouter.delete('/:id', deleteQuestion); // Delete a question by ID

export default questionRouter;
