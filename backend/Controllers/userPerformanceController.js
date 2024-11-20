import UserPerformance from '../Models/userPerformanceSchema.js';

// Controller to fetch user performance
const getUserPerformance = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user's performance data
    const performance = await UserPerformance.findOne({ userId });

    if (!performance) {
      return res.status(404).json({ message: 'Performance data not found' });
    }

    res.json(performance.scores);
  } catch (error) {
    console.error('Error fetching performance data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to add or update user performance
const upsertUserPerformance = async (req, res) => {
  try {
    const { userId, scores } = req.body;

    // Update if user exists, otherwise create new entry
    const performance = await UserPerformance.findOneAndUpdate(
      { userId },
      { userId, scores },
      { new: true, upsert: true }
    );

    res.json({ message: 'Performance data saved successfully', performance });
  } catch (error) {
    console.error('Error saving performance data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getUserPerformance, upsertUserPerformance };
