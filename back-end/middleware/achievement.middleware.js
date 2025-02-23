import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Achievement } from "../models/achievement.model.js";

const secretKey = process.env.SECRET_KEY;

/**
 * Generic middleware to check and add achievements
 * @param {string} achievementName - The name of the achievement
 * @param {string} userField - The field to check (e.g., 'articlesPublished', 'commentedArticles', 'likedArticles')
 * @param {number} requiredCount - The count required to earn the achievement
 */
const Check_add_achievement_generic = (achievementName, userField, requiredCount) => {
    return async (req, res, next) => {
        try {
            // Validate Authorization Header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ error: "Unauthorized access." });
            }

            const token = authHeader.split(" ")[1];

            // Decode and Verify Token
            let decoded;
            try {
                decoded = jwt.verify(token, secretKey);
            } catch (err) {
                return res.status(401).json({ error: "Invalid or expired token." });
            }

            const userId = decoded.userId;
            const fetched_user = await User.findById(userId);

            if (!fetched_user) {
                return res.status(404).json({ error: "User not found." });
            }
            console.log(fetched_user.achievements)
            await fetched_user.populate('achievements')
            console.log(fetched_user)
            // Achievement Update Section
            if (!fetched_user.achievements.includes({name:achievementName})) {
                console.log("entered ifblock for liked article")
                console.log(fetched_user[userField].length)
                if (fetched_user[userField].length >= requiredCount) {
                    console.log("enterde inner ")
                    let imageLink;
                    if (achievementName == "Blogger") {
                        imageLink = "https://res.cloudinary.com/djfhwhtyy/image/upload/v1739444575/r2l5abcbzeaxvxlt4bmq.png"
                    }else if(achievementName == "Commenter"){
                        imageLink = "https://res.cloudinary.com/djfhwhtyy/image/upload/v1739444575/xabqfgt1ttwq1iuipob9.png"
                    }else if (achievementName == "Reactor") {
                        imageLink= "https://res.cloudinary.com/djfhwhtyy/image/upload/v1739444575/hgzwiazf2pxcytpgdyue.png"
                    }
                    const new_achievement = new Achievement({
                        name: achievementName,
                        user: fetched_user._id,
                        achievedOn: Date.now(),
                        image: imageLink
                    });

                    await new_achievement.save();
                    fetched_user.achievements.push(new_achievement._id);
                    await fetched_user.save();
                }
            }

            next();
        } catch (error) {
            console.error("Internal Server Error:", error);
            res.status(500).json({ error: "Internal Server Error." });
        }
    };
};

// Define specific middleware using the generic function
const Check_add_achievement = Check_add_achievement_generic("Blogger", "articlesPublished", 9);
const Check_add_achievement_comments = Check_add_achievement_generic("Commenter", "commentedArticles", 9);
const Check_add_achievement_liked = Check_add_achievement_generic("Reactor", "likedArticles", 15);

export { Check_add_achievement, Check_add_achievement_comments, Check_add_achievement_liked };
