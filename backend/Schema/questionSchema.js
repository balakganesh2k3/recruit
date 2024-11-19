const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "Technical", "Behavioral"
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags: [String], // e.g., ["JavaScript", "Soft Skills"]
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
