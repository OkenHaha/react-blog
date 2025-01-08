import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import menuIcon from "../assets/menu.svg";
import closeIcon from "../assets/close.svg";
import { link } from "./Baselink";
import { BsMoon, BsSun } from "react-icons/bs";  // You can import icons from react-icons
import { login as authLogin, logout as authLogout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ theme, toggleTheme }) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const url = `${link}`;
  const [loginCredential, setLoginCredential] = useState(useSelector((state) => state.auth.user));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.authStatus); 
  const [user, setUser] = useState("");
  const [toggle, setToggle] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const login = async (event) => {
    event.preventDefault();
    
    // Add validation before making the API call
    if (!loginCredential) {
      setError('Please enter your email or username');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      const response = await axios.post(url + "/api/auth/login", {
        credential: loginCredential, // Can be either email or username
        password
      });
      const token = response.data.token;
      localStorage.setItem("token", `Bearer ${token}`);
      dispatch(authLogin(response.data.username));
      navigate("/");
      handleClose();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.status === 401
          ? "Invalid credentials. Please check your email/username and password."
          : error.response?.status === 404
          ? "User not found. Please check your email/username."
          : "An error occurred during login. Please try again later.";
      setError(errorMessage);
    }
  };

  const register = async (event) => {
    event.preventDefault();
    if (!validateRegistration()) return;

    try {
      const response = await axios.post(url + "/api/auth/register", {
        username: loginCredential,
        email,
        password,
        name,
        location,
        picture,
        dob,
        otp
      });

      const token = response.data.token;
      localStorage.setItem("token", `Bearer ${token}`);
      dispatch(authLogin(loginCredential));
      navigate("/");
      handleClose();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  const validateRegistration = () => {
    // Enhanced password validation
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/(?=.*[0-9])/.test(password)) {
      setError('Password must contain at least one number');
      return false;
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password must contain at least one special character (!@#$%^&*)');
      return false;
    }

    // Enhanced email validation
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Other validations remain the same
    if (!loginCredential || !name) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setLoginCredential('');
    setEmail('');
    setPassword('');
    setName('');
    setLocation('');
    setPicture('');
    setDob('');
    setError('');
    setOtp('');
    setShowOtpInput(false);
    setRegistrationData(null);
  };

  const handleOpen = () => {
    setOpen(true);
    resetForm();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(url + "/api/auth/getProfile")
        .then((response) => {
          dispatch(authLogin(response.data.user.username));
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(authLogout());
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(authLogout())
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleGenerateOtp = async (event) => {
    event.preventDefault();
    try {
      if (!validateRegistration()) {
        return;
      }
      setError('');
      await axios.post(url + '/api/auth/register/generate-otp', {
        email: email
      });
      setError('OTP has been sent to your email');
      setRegistrationData({
        username: loginCredential,
        email,
        password,
        name,
        location,
        picture,
        dob,
      });
      
      setShowOtpInput(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <>
      <div
        id="navbar"
        className="flex justify-between items-center p-4 text-[18px] bg-green-900 text-white transition-all duration-300 ease-in-out"
      >
        <div id="logo" className="font-bold hover:text-green-400 transition-colors duration-300 ease-in-out">
          <Link to="/">React Blog</Link>
        </div>

        <div id="comp" className="hidden md:flex justify-center items-center">
          <ul className="flex space-x-6 font-semibold text-sm">
            <li className="p-3 cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out">
              <Link to="/">Home</Link>
            </li>
            <li className="p-3 cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out">
              <Link to="/about">About</Link>
            </li>
            <li className="p-3 cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out">
              <Link to="/article-list">Articles</Link>
            </li>
            <li className="p-3 cursor-pointer hover:text-green-400 transition-all duration-300 ease-in-out">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <p
                    className="cursor-pointer hover:text-green-300"
                    onClick={handleProfileClick}
                  >
                    {user}
                  </p>
                  <button
                    onClick={logout}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpen}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out"
                >
                  Login/Register
                </button>
              )}
            </li>
            <li className="py-4">
              <button
                className="theme-toggler transition-all duration-300"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative hover:bg-gray-300 transition-all duration-300 ease-in-out">
                    <BsSun className="text-yellow-500 text-xl" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative hover:bg-gray-300 transition-all duration-300 ease-in-out">
                    <BsMoon className="text-white text-xl" />
                  </div>
                )}
              </button>
            </li>
          </ul>
        </div>

        <div className="sm:flex md:hidden justify-between items-center">
          <img
            src={toggle ? closeIcon : menuIcon}
            className="h-[24px] w-[24px] cursor-pointer transition-all duration-300 ease-in-out"
            alt="menu"
            onClick={() => setToggle((prev) => !prev)}
          />
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-gradient-to-r from-green-700 to-green-900 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-md transition-all duration-300 ease-in-out`}
          >
            <ul className="list-none flex flex-col space-y-3">
              <li className="p-3 cursor-pointer text-white hover:text-green-300 transition-all duration-300 ease-in-out">
                <Link to="/">Home</Link>
              </li>
              <li className="p-3 cursor-pointer text-white hover:text-green-300 transition-all duration-300 ease-in-out">
                <Link to="/about">About</Link>
              </li>
              <li className="p-3 cursor-pointer text-white hover:text-green-300 transition-all duration-300 ease-in-out">
                <Link to="/article-list">Articles</Link>
              </li>
              <li className="p-3 cursor-pointer text-white hover:text-green-300 transition-all duration-300 ease-in-out">
                {isLoggedIn ? (
                  <div>
                    <p
                      className="inline-block mr-4 cursor-pointer hover:text-green-300"
                      onClick={handleProfileClick}
                    >
                      {user}
                    </p>
                    <button
                      onClick={logout}
                      className="hover:text-red-300 transition-all duration-300 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleOpen}
                    className="hover:text-green-300 transition-all duration-300 ease-in-out"
                  >
                    Login/Register
                  </button>
                )}
              </li>
              <li className="py-4">
                <button
                  className="theme-toggler transition-all duration-300"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? (
                    <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative hover:bg-gray-300 transition-all duration-300 ease-in-out">
                      <BsSun className="text-yellow-500 text-xl" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative hover:bg-gray-300 transition-all duration-300 ease-in-out">
                      <BsMoon className="text-white text-xl" />
                    </div>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className={`relative w-full max-w-sm p-8 rounded-lg shadow-2xl ${theme === 'dark' ? 'bg-gray-900 text-slate-100' : 'bg-slate-200'}`}>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="text-center mb-6">
              <h2 className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : ''}`}>
                {isLogin ? 'Login' : 'Register'}
              </h2>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-white' : ''}`}>
                {isLogin ? "Welcome back! Please login to your account." : "Create your account to get started."}
              </p>
            </div>
            <form onSubmit={isLogin ? login : register} className="flex flex-col gap-4">
              <input
                type="text"
                value={loginCredential}
                onChange={(event) => setLoginCredential(event.target.value)}
                placeholder={isLogin ? "Email or Username" : "Username"}
                required
                className={`w-full p-3 rounded-lg border ${loginCredential ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
              />
              {!isLogin && (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    required
                    className={`w-full p-3 rounded-lg border ${email ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Full Name"
                    required
                    className={`w-full p-3 rounded-lg border ${name ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Location (Optional)"
                    className={`w-full p-3 rounded-lg border ${location ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                  />
                  <input
                    type="text"
                    value={picture}
                    onChange={(event) => setPicture(event.target.value)}
                    placeholder="Profile Picture URL (Optional)"
                    className={`w-full p-3 rounded-lg border ${picture ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                  />
                  <input
                    type="date"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                    className={`w-full p-3 rounded-lg border ${dob ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                  />
                </>
              )}
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
                className={`w-full p-3 rounded-lg border ${password ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
              />
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              {!isLogin && !showOtpInput && (
                <button
                  type="button"
                  onClick={handleGenerateOtp}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                >
                  Generate OTP
                </button>
              )}

              {!isLogin && showOtpInput && (
                <>
                  <input
                    type="text"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    placeholder="Enter OTP"
                    required
                    className={`w-full p-3 rounded-lg border ${otp ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                  >
                    Register
                  </button>
                </>
              )}
              <p
                onClick={toggleLogin}
                className="text-center text-blue-500 text-sm cursor-pointer hover:underline"
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
              </p>
              {
                isLogin && !showOtpInput && (
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg">Submit</button>
                )
              }
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
