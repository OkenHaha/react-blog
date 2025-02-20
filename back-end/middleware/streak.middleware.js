import { Streak } from "../models/streak.model.js";

// Middleware to check user's streak and reset if necessary
const checkStreak = async (req, res, next) => {
  try {
    const { u_id } = req.body; // Extract user ID from request

    if (!u_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find user's streak record
    let streak = await Streak.findOne({ user: u_id });

    // If no streak record exists, create one with streak 0
    if (!streak) {
      streak = new Streak({ user: u_id, streak: 0, lastUpdate: new Date() });
      await streak.save();
      return next(); // No need to reset if it's the first streak entry
    }

    // Get the current date and last update date
    const currentDate = new Date();
    const lastUpdateDate = new Date(streak.lastUpdate);

    // Calculate the difference in days between last update and today
    const timeDifference = currentDate.getTime() - lastUpdateDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert ms to days

    if (daysDifference >= 2) {
      // If more than 1 day has passed, reset the streak
      console.log(`User ${u_id} missed a day. Resetting streak.`);
      streak.streak = 0;
    }

    // Update last checked date
    streak.lastUpdate = currentDate;
    await streak.save();

    next(); // Move to next middleware or route handler
  } catch (error) {
    console.error("Error checking streak:", error);
    res.status(500).json({ message: "Error checking streak", error: error.message });
  }
};

export { checkStreak };
