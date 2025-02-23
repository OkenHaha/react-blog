import express from "express";
import { getAchievements } from "../controllers/achievement.controller.js";

const achievementRouter= express.Router()

achievementRouter.get("/getachievements",getAchievements)

export {achievementRouter}