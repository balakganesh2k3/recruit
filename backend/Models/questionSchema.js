import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: [String], required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags: [String], // e.g., ["JavaScript", "Soft Skills"]
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Question', questionSchema);
