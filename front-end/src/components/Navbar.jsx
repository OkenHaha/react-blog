import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Model from './Model';

const Navbar = ({ theme, toggleTheme }) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "api/auth/login", { username, password });
      const token = response.data.token;
      localStorage.setItem('token', `Bearer ${token}`);
      setIsLoggedIn(true);
      setUser(username);
      handleClose();
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during login');
    }
  };

  const register = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + 'api/auth/register', { username, email, password });
      const token = response.data.token;
      localStorage.setItem('token', `Bearer ${token}`);
      setIsLoggedIn(true);
      setUser(username);
      handleClose();
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during registration');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(url + 'api/auth/getProfile')
        .then((response) => {
          setUser(response.data.username);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
       <nav className="text-center fixed top-0 bg-gray-900 font-bold w-full text-lg text-white flex justify-between items-center px-4 md:justify-evenly">
      <div className="inline-block py-4">
        <h1 className="text-white hover:text-blue-400 duration-300 pl-6 pr-8 font-mono cursor-pointer">
          Ctrl + Alt + Blog
        </h1>
      </div>
      <div className="hidden md:flex">
        <ul className="menu-items flex">
          <li className="inline-block py-4">
            <Link to="/" className="text-white hover:text-blue-400 duration-300 px-4 md:pl-6 md:pr-8">
              Home
            </Link>
          </li>
          <li className="inline-block py-4">
            <Link to="/about" className="text-white hover:text-blue-400 duration-300 px-4 md:pl-6 md:pr-8">
              About
            </Link>
          </li>
          <li className="inline-block py-4">
            <Link to="/article-list" className="text-white hover:text-blue-400 duration-300 px-4 md:pl-6 md:pr-8">
              Articles
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        <ul className="flex items-center">
          <li className="inline-block py-4">
            {isLoggedIn ? (
              <div className="flex items-center">
                <p
                  className="inline-block mr-4 cursor-pointer hover:text-blue-400 duration-300"
                  onClick={handleProfileClick}
                >
                  {user}
                </p>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-900 duration-300 py-1 px-3 bg-red-500 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleOpen}
                className="text-white hover:text-gray-900 duration-300 py-1 px-3 bg-blue-400 rounded-lg"
              >
                Login
              </button>
            )}
          </li>
          <li className="inline-block px-3 py-1 bg-gray-700 rounded-3xl mx-8 text-center">
            <button className="theme-toggler" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </div>
    </nav>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50 ">
          <div className={`relative w-full max-w-sm p-8 rounded-lg shadow-2xl ${
            theme === 'dark' ? 'bg-gray-900 text-slate-100' : 'bg-slate-200'
          }`}>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-400 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="text-center mb-6">
              <h2 className={`text-3xl font-extrabold ${
                theme === 'dark' ? 'bg-gray-900 text-white' : ''
              }`}>
                {isLogin ? 'Login' : 'Register'}
              </h2>
              <p className={`text-sm mt-2 ${
                theme === 'dark' ? 'bg-gray-900 text-white' : ''
              }`}>
                {isLogin
                  ? "Welcome back! Please login to your account."
                  : "Create your account to get started."}
              </p>
            </div>
            <form
              onSubmit={isLogin ? login : register}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                required
                className={`w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700 ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : ''
                }`}
              />
              {!isLogin && (
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  required
                  className={`w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700 ${
                    theme === 'dark' ? 'bg-gray-700 text-white' : ''
                  }`}
                />
              )}
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
                className={`w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700 ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : ''
                }`}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
              <p
                onClick={toggleLogin}
                className="text-center text-blue-500 text-sm cursor-pointer hover:underline"
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

