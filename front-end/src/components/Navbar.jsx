import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import menuIcon from "../assets/menu.svg";
import closeIcon from "../assets/close.svg";
import logo from "../assets/logo.png";
import { link } from "./Baselink";
import { BsMoon, BsSun } from "react-icons/bs";  // You can import icons from react-icons
import { HiHome, HiInformationCircle, HiNewspaper, HiUser, HiMenu, HiX } from 'react-icons/hi';
import { LuSearch } from "react-icons/lu";
import { login as authLogin, logout as authLogout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBookBookmark } from "react-icons/fa6";
import {AnimatePresence} from "framer-motion";
import { motion } from "framer-motion";
import { BsBell } from 'react-icons/bs';
import { FiActivity, FiBell, FiBookmark, FiEdit3, FiSettings } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import { useClickAway } from 'react-use';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdArticle, MdDashboard } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { useTheme } from '../hooks/useTheme'; // Create this custom hook

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

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
  const authUser = useSelector((state) => state.auth.user);
  const [loginCredential, setLoginCredential] = useState("");
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
  const [toggle, setToggle] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const locationOfPage = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Add click away listeners
  useClickAway(searchRef, () => setShowSearch(false));
  useClickAway(notificationsRef, () => setShowNotifications(false));
  useClickAway(profileDropdownRef, () => setShowProfileDropdown(false));

  // Add notification state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'comment',
      message: 'New comment on your article "React Best Practices"',
      time: new Date(Date.now() - 7200000), // 2 hours ago
      read: false,
      link: '/article/1#comments'
    },
    {
      id: 2,
      type: 'like',
      message: 'John Doe liked your article',
      time: new Date(Date.now() - 10800000), // 3 hours ago
      read: false,
      link: '/article/2'
    },
    {
      id: 3,
      type: 'follow',
      message: 'Sarah Smith started following you',
      time: new Date(Date.now() - 18000000), // 5 hours ago
      read: true,
      link: '/profile/sarah'
    }
  ]);

  // Add notification handlers
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Modified styling classes
  const navBg = theme === 'light'
    ? 'bg-white/90 backdrop-blur-md'
    : 'bg-gray-900/90 backdrop-blur-md';

  const navClass = `fixed w-full z-50 transition-all duration-300 ${navBg} ${theme === 'light'
      ? 'shadow-[0_4px_20px_rgb(0,0,0,0.05)]'
      : 'shadow-[0_4px_20px_rgb(255,255,255,0.05)]'
    }`;

  const linkClass = `group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium
    transition-all duration-300 transform hover:scale-105 ${theme === 'light'
      ? 'text-gray-600 hover:text-blue-600'
      : 'text-gray-300 hover:text-blue-400'
    }`;

    const getLinkClass = (path) => {
      const isActive = locationOfPage.pathname === path;
      return `group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium
          transition-all duration-300 transform hover:scale-105 
          ${isActive
          ? theme === 'light'
            ? 'text-indigo-600'
            : 'text-purple-400'
          : theme === 'light'
            ? 'text-gray-600 hover:text-indigo-600'
            : 'text-gray-300 hover:text-purple-400'
        }`;
    };
    
    const getUnderlineClass = (path) => {
      const isActive = locationOfPage.pathname === path;
      return `absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2
          transition-all duration-300 ease-out
          ${isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'}
          ${theme === 'light' ? 'bg-indigo-600' : 'bg-purple-400'}`;
    };

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
      localStorage.setItem("userId", response.data.userId);
      dispatch(authLogin(response.data.username))
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
      localStorage.setItem("userId", response.data.id);
      dispatch(authLogin(loginCredential))
      navigate("/");
      handleClose();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  };

  const validateRegistration = () => {
    
    if (dob) {
      const selectedDate = new Date(dob);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (selectedDate > yesterday) {
        setError('Date of birth cannot be later than yesterday');
        return false;
      }
    }

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
          dispatch(authLogin(response.data.user.username))
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(authLogout())
        });
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      setLoginCredential(authUser.username || "");
    }
  }, [authUser]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/article-list?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // Add these utility functions at the top
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  // Add these new components
  const NotificationIcon = ({ type }) => {
    switch (type) {
      case 'comment':
        return <MdArticle className="w-5 h-5 text-blue-500" />;
      case 'like':
        return <AiOutlineHeart className="w-5 h-5 text-red-500" />;
      case 'follow':
        return <BiUserCircle className="w-5 h-5 text-green-500" />;
      default:
        return <IoNotificationsOutline className="w-5 h-5 text-gray-500" />;
    }
  };

  const UserAvatar = ({ user, size = "md" }) => {
    const sizes = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12"
    };

    return (
      <div className={`${sizes[size]} rounded-full overflow-hidden`}>
        {user?.picture ? (
          <img 
            src={user.picture} 
            alt={user.username} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    );
  };

  // Add these new functions
  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      ));
    }
    navigate(notification.link);
    setShowNotifications(false);
  };

  return (
    <>
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2 group">
              <span>
                <img src={logo} alt="img" className="w-20 p-3 rounded-full"/>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`${linkClass} p-2`}
                  aria-label="Search"
                >
                  <LuSearch className="w-5 h-5" />
                </button>
                
                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                    >
                      <form onSubmit={handleSearch} className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                          >
                            <LuSearch className="w-5 h-5" />
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/" className={`${getLinkClass('/')} group`}>
                <HiHome className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span>Home</span>
                <div className={getUnderlineClass('/')} />
              </Link>
              <Link to="/about" className={`${getLinkClass('/about')} group`}>
                <HiInformationCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span>About</span>
                <div className={getUnderlineClass('/about')} />
              </Link>
              <Link to="/article-list" className={`${getLinkClass('/article-list')} group`}>
                <HiNewspaper className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                <span>Articles</span>
                <div className={getUnderlineClass('/article-list')} />
              </Link>
              
              {
                isLoggedIn ? (""):(

                  <Link to={'/savedArticles'}>
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <FaBookBookmark size={15} color="gray"/>
                      <span> Saved For Later Articles</span>
                    </div>
                  </Link>
                )
              }

              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`${linkClass} p-2 relative`}
                  aria-label="Notifications"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold dark:text-white">Notifications</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={markAllAsRead}
                              className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              Mark all as read
                            </button>
                            <span className="text-sm text-gray-500">|</span>
                            <button
                              onClick={() => navigate('/notifications')}
                              className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              See all
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                          {notifications.length > 0 ? (
                            notifications.map(notification => (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleNotificationClick(notification)}
                                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer
                                  ${!notification.read 
                                    ? 'bg-blue-50 dark:bg-blue-900/20' 
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                  } transition-colors duration-200`}
                              >
                                <NotificationIcon type={notification.type} />
                                <div className="flex-1">
                                  <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                                    {notification.message}
                                  </p>
                                  <span className="text-xs text-gray-500">
                                    {getTimeAgo(notification.time)}
                                  </span>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                                )}
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No notifications yet
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full
                      transition-all duration-300 transform hover:scale-105 ${
                        theme === 'light'
                          ? 'bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                      }`}
                    >
                      <UserAvatar user={authUser} size="lg" />
                      <span>{authUser?.username || ""}</span>
                    </button>

                    <AnimatePresence>
                      {showProfileDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
                        >
                          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                              <UserAvatar user={authUser} size="lg" />
                              <div>
                                <h3 className="font-semibold dark:text-white">{authUser?.username}</h3>
                                <p className="text-sm text-gray-500">{authUser?.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div className="text-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <p className="font-semibold">12</p>
                                <p className="text-sm text-gray-500">Articles</p>
                              </div>
                              <div className="text-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <p className="font-semibold">1.2k</p>
                                <p className="text-sm text-gray-500">Followers</p>
                              </div>
                            </div>
                            <button
                              onClick={handleProfileClick}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <HiUser className="w-5 h-5" />
                              <span>Profile</span>
                            </button>
                            <button
                              onClick={() => navigate('/dashboard')}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <RiDashboardLine className="w-5 h-5" />
                              <span>Dashboard</span>
                            </button>
                            <button
                              onClick={() => navigate('/addarticle')}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <FiEdit3 className="w-5 h-5" />
                              <span>Write Article</span>
                            </button>
                            <button
                              onClick={() => navigate('/savedArticles')}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <FiBookmark className="w-5 h-5" />
                              <span>Saved Articles</span>
                            </button>
                            <button
                              onClick={() => navigate('/settings')}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <FiSettings className="w-5 h-5" />
                              <span>Settings</span>
                            </button>
                            <hr className="my-2 border-gray-200 dark:border-gray-700" />
                            <button
                              onClick={logout}
                              className="w-full flex items-center space-x-2 px-4 py-2 text-left rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <span>Logout</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={handleOpen}
                    className={`px-6 py-2 rounded-full text-sm font-medium
                    transform hover:scale-105 transition-all duration-300
                    shadow-lg hover:shadow-xl ${theme === 'light'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                      }`}
                  >
                    Login / Register
                  </button>
                )}

                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full 
                  transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${theme === 'light'
                      ? 'bg-gray-100 hover:bg-blue-50 text-yellow-500 hover:text-yellow-600'
                      : 'bg-gray-800 hover:bg-gray-700 text-blue-400 hover:text-blue-300'
                    }`}
                >
                  {theme === 'light' ? (
                    <BsSun className="w-5 h-5" />
                  ) : (
                    <BsMoon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                  theme === 'light'
                    ? 'hover:bg-gray-100 text-gray-600'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                    >
                      <HiX className="h-6 w-6" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                  >
                    <HiMenu className="h-6 w-6" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <div className={`px-6 py-4 space-y-3 shadow-lg ${theme === 'light'
            ? 'bg-white/95 backdrop-blur-md'
            : 'bg-gray-900/95 backdrop-blur-md'
            }`}>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <button
                  type="submit"
                  className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <LuSearch className="w-5 h-5" />
                </button>
              </div>
            </form>

            <Link to="/" className={`${linkClass} w-full`}>
              <HiHome className="w-5 h-5 mr-2" />
              <span>Home</span>
            </Link>
            <Link to="/about" className={`${linkClass} w-full`}>
              <HiInformationCircle className="w-5 h-5 mr-2" />
              <span>About</span>
            </Link>
            <Link to="/article-list" className={`${linkClass} w-full`}>
              <HiNewspaper className="w-5 h-5 mr-2" />
              <span>Articles</span>
            </Link>
            {isLoggedIn ? (
              <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleProfileClick}
                  className={`w-full text-left ${linkClass}`}
                >
                  <HiUser className="w-5 h-5 mr-2" />
                  <span>{authUser?.username || ""}</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-red-500 hover:text-red-600
                  transition-all duration-300 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleOpen}
                className={`w-full text-left ${linkClass}`}
              >
                Login / Register
              </button>
            )}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center ${linkClass}`}
              >
                {theme === 'light' ? (
                  <>
                    <BsSun className="w-5 h-5 mr-2" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <BsMoon className="w-5 h-5 mr-2" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
            
          </div>
        </div>
      </nav>
      {open && (
    <AnimatePresence>
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`relative w-full max-w-sm p-8 rounded-xl shadow-2xl transition-all duration-300 ${
          theme === "dark"
            ? "bg-gray-900 bg-opacity-80 text-white border border-gray-700 shadow-gray-800"
            : "bg-white bg-opacity-90 text-gray-900 border border-gray-300 shadow-lg"
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold transition duration-300"
        >
          &times;
        </button>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2
            className={`text-3xl font-extrabold transition duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {isLogin ? "Login" : "Register"}
          </h2>
          <p
            className={`text-sm mt-2 transition duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {isLogin
              ? "Welcome back! Please login to your account."
              : "Create your account to get started."}
          </p>
        </div>

        {/* Add your form fields here */}
        <div className="text-center">
        <form onSubmit={isLogin ? login : register} className="flex flex-col gap-5 p-6 bg-opacity-90 rounded-xl backdrop-blur-lg shadow-2xl border border-gray-300 dark:border-gray-700 transition-all duration-300">
  
  {/* Username / Email Input */}
  <input
    type="text"
    value={loginCredential}
    onChange={(event) => setLoginCredential(event.target.value)}
    placeholder={isLogin ? "Email or Username" : "Username"}
    required
    className={`w-full p-3 rounded-lg border transition-all duration-300 outline-none ${
      loginCredential
        ? "border-green-500 shadow-md"
        : "border-gray-300 dark:border-gray-600"
    } focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
  />

  {!isLogin && (
    <>
      {/* Email Input */}
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        required
        className={`w-full p-3 rounded-lg border transition-all duration-300 outline-none ${
          email ? "border-green-500 shadow-md" : "border-gray-300 dark:border-gray-600"
        } focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
      />

      {/* Full Name */}
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Full Name"
        required
        className={`w-full p-3 rounded-lg border transition-all duration-300 outline-none ${
          name ? "border-green-500 shadow-md" : "border-gray-300 dark:border-gray-600"
        } focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
      />

      {/* Location */}
      <input
        type="text"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Location (Optional)"
        className={`w-full p-3 rounded-lg border transition-all duration-300 outline-none ${
          location ? "border-green-500 shadow-md" : "border-gray-300 dark:border-gray-600"
        } focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
      />

      {/* Profile Picture */}
      <input
        type="text"
        value={picture}
        onChange={(event) => setPicture(event.target.value)}
        placeholder="Profile Picture URL (Optional)"
        className={`w-full p-3 rounded-lg border transition-all duration-300 outline-none ${
          picture ? "border-green-500 shadow-md" : "border-gray-300 dark:border-gray-600"
        } focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
      />

      {/* Date of Birth */}
      <input
        type="date"
        value={dob}
        onChange={(event) => setDob(event.target.value)}
        max={getYesterdayDate()}
        className={`w-full p-3 rounded-lg border transition-all duration-300 outline-none ${
          dob ? "border-green-500 shadow-md" : "border-gray-300 dark:border-gray-600"
        } focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
      />
    </>
  )}

  {/* Password */}
  <input
    type="password"
    value={password}
    onChange={(event) => setPassword(event.target.value)}
    placeholder="Password"
    required
    className={`w-full p-3 rounded-lg border transition-all duration-300 outline-none ${
      password ? "border-green-500 shadow-md" : "border-gray-300 dark:border-gray-600"
    } focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
  />

  {/* Error Message */}
  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
      <span>{error}</span>
    </div>
  )}

  {/* Generate OTP */}
  {!isLogin && !showOtpInput && (
    <button
      type="button"
      onClick={handleGenerateOtp}
      className="w-full py-3 bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-600 hover:to-blue-300 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg"
    >
      Generate OTP
    </button>
  )}

  {/* OTP Input */}
  {!isLogin && showOtpInput && (
    <>
      <input
        type="text"
        value={otp}
        onChange={(event) => setOtp(event.target.value)}
        placeholder="Enter OTP"
        required
        className={`w-full p-3 rounded-lg border transition-all duration-300 outline-none ${
          otp ? "border-green-500 shadow-md" : "border-gray-300 dark:border-gray-600"
        } focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white`}
      />

      {/* Register Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-600 hover:to-blue-300 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg"
      >
        Register
      </button>
    </>
  )}

  {/* Toggle Login/Register */}
  <p
    onClick={toggleLogin}
    className="text-center text-blue-500 text-sm cursor-pointer hover:underline"
  >
    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
  </p>

  {/* Login Submit Button */}
  {isLogin && !showOtpInput && (
    <button
      type="submit"
      className="w-full py-3 bg-gradient-to-r  from-blue-300 to-blue-500 hover:from-blue-600 hover:to-blue-300 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg"
    >
      Submit
    </button>
  )}

  {isLogin && (
    <div className="text-center mt-2">
      <Link
        to="/forgot-password"
        onClick={handleClose}
        className="text-sm text-blue-500 hover:text-blue-700"
      >
        Forgot Password?
      </Link>
    </div>
  )}
</form>

        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
      )}
    </>
  );
};

export default Navbar;
