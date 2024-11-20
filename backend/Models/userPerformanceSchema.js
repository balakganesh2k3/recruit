import mongoose from 'mongoose';
// Define the schema for user performance
const UserPerformanceSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Unique identifier for the user
  scores: [
    {
      metric: { type: String, required: true }, // Metric name (e.g., "Aptitude")
      score: { type: Number, required: true },  // Score for that metric
      prevscore: { type: Number },  // Score for that metric
    },
  ],
});

export default mongoose.model('UserPerformance', UserPerformanceSchema);
