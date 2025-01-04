import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const url = "https://react-blog-server-gamma.vercel.app/"

  const [loginCredential, setLoginCredential] = useState(''); // For email/username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [picture, setPicture] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "api/auth/login", { 
        credential: loginCredential, // Can be either email or username
        password 
      });
      const token = response.data.token;
      localStorage.setItem('token', `Bearer ${token}`);
      setIsLoggedIn(true);
      setUser(response.data.username);
      handleClose();
      resetForm();
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Invalid credentials. Please check your email/username and password.');
      } else if (error.response?.status === 404) {
        setError('User not found. Please check your email/username.');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
    }
  };

  const register = async (event) => {
    event.preventDefault();
    try {
      if (!validateRegistration()) {
        return;
      }

      const response = await axios.post(url + 'api/auth/register', {
        username: loginCredential,
        email,
        password,
        name,
        location,
        picture,
        dob
      });
      
      const token = response.data.token;
      localStorage.setItem('token', `Bearer ${token}`);
      setIsLoggedIn(true);
      setUser(loginCredential);
      handleClose();
      resetForm();
    } catch (error) {
      if (error.response?.status === 409) {
        setError('Username or email already exists. Please choose different credentials.');
      } else if (error.response?.status === 400) {
        setError('Invalid registration data. Please check all fields.');
      } else {
        setError('An error occurred during registration. Please try again later.');
      }
    }
  };

  const validateRegistration = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!loginCredential || !email || !password || !name) {
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
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(url + 'api/auth/getProfile')
        .then((response) => {
          setIsLoggedIn(true);
          setUser(response.data.user.username);
        })
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem('token');
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
      <nav className="border-b-4 border-green-700 text-center fixed top-0 bg-green-900 font-bold w-full text-lg text-white">
        <ul className="sm:flex sm:justify-evenly">
          <li className="inline-block py-4">
            <Link to="/" className="pl-6 pr-8">Home</Link>
          </li>
          <li className="inline-block py-4">
            <Link to="/about" className="pl-6 pr-8">About</Link>
          </li>
          <li className="inline-block py-4">
            <Link to="/article-list" className="pl-6 pr-8">Articles</Link>
          </li>
          <li className="inline-block py-4">
            {isLoggedIn ? (
              <div>
                <p className="inline-block mr-4 cursor-pointer hover:text-green-300" onClick={handleProfileClick}>{user}</p>
                <button onClick={logout} className="bg-green-500 text-white px-3 rounded-lg hover:bg-green-600">Logout</button>
              </div>
            ) : (
              <button type="button" onClick={handleOpen} className="bg-green-500 text-white px-3 rounded-lg hover:bg-green-600">Login/Register</button>
            )}
          </li>
          <li className="inline-block py-4">
            <button className="theme-toggler" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </nav>

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
                  {error}
                </div>
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
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;