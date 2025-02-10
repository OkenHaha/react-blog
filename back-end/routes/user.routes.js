import express from 'express';
import { loginUser, registerUser, getProfile, editProfile, deleteUserAccount, resetPassword, getOtherUser, followUser } from "../controllers/user.controller.js";
import { genrateOtp, generateOTPForDelete, generateOTPForPassword } from '../Utils/otpgenerate.js';
import multer from 'multer'


const upload = multer({storage: multer.memoryStorage()})


const userRouter = express.Router();

// Register route
userRouter.post('/register/generate-otp', genrateOtp);
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

// Profile route
userRouter.get('/getProfile', getProfile);

// Edit profile route
userRouter.post('/editProfile', upload.single("picture") , editProfile);

// Delete account route
userRouter.post('/deleteAccount/generate-otp', generateOTPForDelete);
userRouter.delete('/deleteAccount', deleteUserAccount);

// Forgot Password routes
userRouter.post('/forgot-password/generate-otp', generateOTPForPassword);
userRouter.post('/reset-password', resetPassword);

// Get other user's profile
userRouter.get('/user/:userId', getOtherUser);

// Follow/Unfollow routes
userRouter.post('/follow/:userToFollowId', followUser);

export { userRouter };
