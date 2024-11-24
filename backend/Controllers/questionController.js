import Question from '../Models/questionSchema.js';

// Controller to add a new question
export const addQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a question
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get questions by tag
export const getQuestionByTag = async (req, res) => {
    try {
      const { tag } = req.params;
      const questions = await Question.find({ tags: tag });
  
      if (questions.length === 0) {
        return res.status(404).json({ message: `No questions found with tag: ${tag}` });
      }
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
