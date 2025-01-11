import express from 'express';
import { loginUser, registerUser, getProfile, editProfile, deleteUserAccount, resetPassword } from "../controllers/user.controller.js";
import { genrateOtp, generateOTPForDelete, generateOTPForPassword } from '../Utils/otpgenerate.js';

const userRouter = express.Router();

// Register route
userRouter.post('/register/generate-otp', genrateOtp);
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

// Profile route
userRouter.get('/getProfile', getProfile);

// Edit profile route
userRouter.put('/editProfile', editProfile);

// Delete account route
userRouter.post('/deleteAccount/generate-otp', generateOTPForDelete);
userRouter.delete('/deleteAccount', deleteUserAccount);

// Forgot Password routes
userRouter.post('/forgot-password/generate-otp', generateOTPForPassword);
userRouter.post('/reset-password', resetPassword);

export { userRouter };
