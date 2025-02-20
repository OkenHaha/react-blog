import { Streak } from "../models/streak.model";

const updateStreak = async (userId) => {
  try {
    // Find the user's streak record
    let streak = await Streak.findOne({ user: userId });

    if (!streak) {
      // If no streak exists, create a new one starting at 1
      streak = new Streak({ user: userId, streak: 1, lastUpdate: new Date() });
    } else {
      const currentDate = new Date();
      const lastUpdateDate = new Date(streak.lastUpdate);

      // Calculate the difference in days
      const timeDifference = currentDate.getTime() - lastUpdateDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference < 1) {
        // User already published today, do nothing
        console.log(`User ${userId} already published today. Streak unchanged.`);
        return;
      } else if (daysDifference < 2) {
        // If it's the next day, increment streak
        streak.streak += 1;
      } else {
        // If more than one day is missed, reset streak to 1
        streak.streak = 1;
      }
    }

    // Update last update time
    streak.lastUpdate = new Date();
    await streak.save();

    console.log(`Streak updated for user ${userId}: ${streak.streak}`);
  } catch (error) {
    console.error("Error updating streak:", error);
  }
};

export { updateStreak };
