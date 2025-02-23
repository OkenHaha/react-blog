import { Achievement } from "../models/achievement.model.js";
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";

dotenv.config()

const secretKey = process.env.SECRET_KEY
const getAchievements = async (req, res) => {
    try {
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
            console.log(err)
            return res.status(401).json({ error: "Maybe invalid token" });
        }

        const userId = decoded.userId;
        const fetched_user = await User.findById(userId);

        if (!fetched_user) {
            return res.status(404).json({ error: "User not found." });
        }
        console.log(fetched_user.achievements)
        await fetched_user.populate('achievements')
        console.log(fetched_user)

        return res.status(200).send({ success: "achievements fetched successfully", fetchedAchievements: fetched_user.achievements })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: error })
    }
}

export {getAchievements}