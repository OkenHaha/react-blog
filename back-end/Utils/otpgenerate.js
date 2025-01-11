import {User} from '../models/user.model.js';
import OTP from '../models/otp.model.js';
import otpgenerator from 'otp-generator';
import { sendMail } from './mailsender.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const secretKey = process.env.SECRET_KEY;

export const genrateOtp = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered"
            });
        }

        let otp;
        let findOTP;

        do {
            otp = otpgenerator.generate(6, {
                specialChars: false,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false
            });
            findOTP = await OTP.findOne({ otp });
        } while (findOTP);

        const finalOTP = await OTP.create({ email, otp });

        await sendMail(
            email,
            "Dear Registered User, This is the OTP for your registration for React Blog App",
            finalOTP.otp
        );

        return res.status(200).json({
            success: true,
            message: "OTP Generated",
            OTP: finalOTP
        });

    } catch (err) {
        console.error("Error while generating OTP:", err);
        return res.status(500).json({
            success: false,
            message: "Error while generating OTP",
            error: err.message
        });
    }
};

export const generateOTPForDelete = async (req, res) => {
    try {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let otp;
        let findOTP;

        do {
            otp = otpgenerator.generate(6, {
                specialChars: false,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false
            });
            findOTP = await OTP.findOne({ otp });
        } while (findOTP);

        const finalOTP = await OTP.create({ email, otp });

        await sendMail(
            email,
            "OTP FOR DELETE ACCOUNT",
            finalOTP.otp
        );

        return res.status(200).json({
            success: true,
            message: "OTP Generated",
            OTP: finalOTP
        });

    } catch (err) {
        console.error("Error while generating OTP:", err);
        return res.status(500).json({
            success: false,
            message: "Error while generating OTP",
            error: err.message
        });
    }
}

export const generateOTPForPassword = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.error("Authorization header is missing.");
            return res.status(401).json({ error: "No token provided." });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.error("Bearer token is missing.");
            return res.status(401).json({ error: "Invalid token format." });
        }

        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.userId);
        if (!user) {
            console.error(`User not found for token with userId: ${decoded.userId}.`);
            return res.status(404).json({ error: "User not found." });
        }

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "No user found with this email"
            });
        }

        let otp;
        let findOTP;

        do {
            otp = otpgenerator.generate(6, {
                specialChars: false,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false
            });
            findOTP = await OTP.findOne({ otp });
        } while (findOTP);

        const finalOTP = await OTP.create({ email, otp });

        await sendMail(
            email,
            "Password Reset OTP for React Blog App",
            `Your OTP for password reset is: ${finalOTP.otp}`
        );

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent to your email",
            OTP: finalOTP
        });

    } catch (err) {
        console.error("Error while generating password reset OTP:", err);
        return res.status(500).json({
            success: false,
            message: "Error while generating OTP",
            error: err.message
        });
    }
};
