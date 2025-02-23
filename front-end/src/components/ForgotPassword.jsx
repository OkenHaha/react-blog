import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { link } from './Baselink';

const ForgotPassword = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showOtpForm, setShowOtpForm] = useState(false);
    const navigate = useNavigate();

    const handleGenerateOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Email validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            await axios.post(`${link}/api/auth/forgot-password/generate-otp`, { email });
            setSuccess('OTP has been sent to your email');
            setShowOtpForm(true);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send OTP');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!otp || !newPassword || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Password strength validation
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        if (!/(?=.*[A-Z])/.test(newPassword)) {
            setError('Password must contain at least one uppercase letter');
            return;
        }
        if (!/(?=.*[0-9])/.test(newPassword)) {
            setError('Password must contain at least one number');
            return;
        }
        if (!/(?=.*[!@#$%^&*])/.test(newPassword)) {
            setError('Password must contain at least one special character (!@#$%^&*)');
            return;
        }

        try {
            await axios.post(`${link}/api/auth/reset-password`, {
                email,
                otp,
                newPassword,
                confirmPassword
            });
            setSuccess('Password reset successful! Redirecting to login...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to reset password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
                }`}>
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold">
                        {showOtpForm ? 'Reset Password' : 'Forgot Password'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        {showOtpForm
                            ? 'Enter the OTP sent to your email and your new password'
                            : 'Enter your email to receive a password reset OTP'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        {success}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={showOtpForm ? handleResetPassword : handleGenerateOtp}>
                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            disabled={showOtpForm}
                        />

                        {showOtpForm && (
                            <>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm New Password"
                                    className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                                        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                />
                            </>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {showOtpForm ? 'Reset Password' : 'Send OTP'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 