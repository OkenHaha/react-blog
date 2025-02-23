import { Streak } from "../models/streak.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


const secretKey = process.env.SECRET_KEY;

const updateStreak = async (userId) => {
  try {
    // Find the user's streak record
    let streak = await Streak.findOne({ user: userId });
    console.log("entered streak", streak)
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


const getCurrentStrak = async (req,res) => {
  try {
      // Validate Authorization Header
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if (!authHeader) {
          console.error("Authorization header is missing.");
          return res.status(401).json({ error: "No token provided." });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
          console.error("Bearer token is missing.");
          return res.status(401).json({ error: "Invalid token format." });
      }

      // Decode and Verify Token
      let decoded;
      try {
          decoded = jwt.verify(token, secretKey);
      } catch (err) {
          console.error("Error decoding token:", err.message);
          return res.status(401).json({ error: "Invalid or expired token." });
      }

      // Find the authenticated user
      const userId = decoded.userId;
      const user = await User.findById(userId);

      const fetchedStreak = await Streak.findOne({ user: userId });
      if (!fetchedStreak) {
          return res.status(404).json({ message: "Streak record not found." });
      }
      return res.status(200).json({ streak: fetchedStreak });
  } catch (error) {
    console.error("Error updating streak:", error);
    
  }
}

export { updateStreak, getCurrentStrak };
