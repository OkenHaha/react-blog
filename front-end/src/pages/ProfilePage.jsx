import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { link } from '../components/Baselink';
import { useDispatch } from 'react-redux';
import { logout as authLogout } from "../store/authSlice";
import { toast } from 'react-toastify';
import SaveForLaterArticleList from '../components/SaveForLaterComp/SaveforLater';
import LikedArticles from '../components/LikeArticles/LikeArticlesComp';
import {
  UserCircleIcon,
  ChartBarIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import LikeButton from '../components/LikeButton';

const dummyFollowing = [
  { id: 1, name: "User 1", image: "https://via.placeholder.com/50" },
  { id: 2, name: "User 2", image: "https://via.placeholder.com/50" },
  { id: 3, name: "User 2", image: "https://via.placeholder.com/50" },
  { id: 4, name: "User 3", image: "https://via.placeholder.com/50" },
  { id: 5, name: "User 4", image: "https://via.placeholder.com/50" }
];


const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const url = `${link}`;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const[streak, setStreak] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');


  }, [])
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(url + '/api/auth/getProfile', {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        console.log(response.data.user);
        setUser(response.data.user);

        // Fetch user articles
        axios
          .post(`${url}/api/article/getarticlesbyuser`, { uid: response.data.user._id })
          .then(response => {
            console.log(response.data.articleDetails);
            setUserArticles(response.data.articleDetails);
            axios
            .get(url + '/api/auth/streak', {
              headers: {
                Authorization: token,
              },
            })
            .then(response => {
              // console.log(response.data);
              setStreak(response.data.streak);

            })
            .catch(error => {
              console.error(error);
            });
        
          });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${url}/api/auth/deleteAccount/generate-otp`, {
        email: user.email
      });
      setIsOtpSent(true);
      toast.info('OTP has been sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${url}/api/auth/deleteAccount`, {
        headers: { Authorization: token },
        data: { otp }
      });

      // Clear local storage and redux state
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      dispatch(authLogout());

      toast.success('Your account has been successfully deleted');
      setIsDeleting(false);
      setShowDeleteModal(false);
      setIsOtpSent(false);
      setOtp('');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete account');
    }
  };

  return (
    <div className="profile-container min-h-screen p-4 md:p-8 pt-20 md:pt-20 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto pt-10 md:pt-10">
        {/* Profile Header with Edit and Delete Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300">
            User Profile
          </h1>
          {/* Action Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Edit Profile Button */}
            <button
              onClick={() => navigate('/edit-profile')}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <PencilIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
            
            {/* Delete Account Button */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <TrashIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Delete Account</span>
            </button>
          </div>
        </div>

        {/* Main Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col items-center space-y-4">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-indigo-100 dark:border-gray-700 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-md">
                    <span className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
                      {user.name?.split(' ').map((word) => word[0]).join('')}
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    @{user.username}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                    Activity Overview
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Articles', value: userArticles.length },
                      { label: 'Likes', value: user?.likedArticles?.length || 0 },
                      { label: 'Comments', value: user?.commentedArticles?.length || 0 }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5 text-indigo-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem 
                  label="Email" 
                  value={user.email}
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                />
                <DetailItem 
                  label="Location" 
                  value={user.location || "Not specified"}
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                />
                <DetailItem 
                  label="Member Since" 
                  value={user.accountCreated ? new Date(user.accountCreated).toLocaleDateString('en-GB') : "Not available"}
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                />
                <DetailItem 
                  label="Date of Birth" 
                  value={user.dob ? new Date(user.dob).toLocaleDateString('en-GB') : "Not specified"}
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                />
                <DetailItem 
                  label="Current Strak" 
                  value={streak ? streak.streak : "Strat Writing Articles..."}
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                />
              </div>
            </div>

            {/* Author Level Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-indigo-600" />
                Author Level Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Level: {user.authorLevel?.levelName || "Beginner"}
                  </span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {user.authorLevel?.levelProgress || 0}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${user.authorLevel?.levelProgress || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white mt-10 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-indigo-600" />
                You Following:
              </h3>
    <motion.div 
      className="space-y-4 p-4 bg-white shadow-md rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-lg font-semibold text-blue-600">You are following:</h2>

      {user.following && user.following.length > 0 ? (
        <motion.ul className="space-y-2">
          {user.following.map((followedUser) => (
            <motion.li
              key={followedUser.id}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-100 transition duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <img src={followedUser.image} alt={followedUser.name} className="w-12 h-12 rounded-full border-2 border-blue-500" />
              <span className="font-medium text-gray-800">{followedUser.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.ul className="space-y-2 text-gray-500">
          {dummyFollowing.map((user) => (
            <motion.li
              key={user.id}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-100 transition duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full border-2 border-gray-400" />
              <span className="font-medium text-gray-700">{user.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>


        </div>

        {/* Additional Sections */}
        <div className="grid gap-8 mt-12">
          {/* User's Articles Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Your Articles
            </h3>
            
            {userArticles.length > 0 ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {userArticles.map((article) => (
                    <motion.div
                      key={article._id}
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          scale: 0.9,
                          y: 20 
                        },
                        visible: { 
                          opacity: 1, 
                          scale: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                          }
                        },
                        hover: {
                          scale: 1.03,
                          boxShadow: "0 15px 30px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.08)",
                          transition: { duration: 0.3 }
                        }
                      }}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
                    >
                      {article.thumbnail && (
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      )}

                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-xs">
                            {article.tag || 'Uncategorized'}
                          </span>
                          <LikeButton
                            articleId={article._id}
                            initialLikes={article.likes || 0}
                          />
                        </div>

                        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-3">
                          {article.title}
                        </h3>

                        <Markdown className="text-gray-600 dark:text-gray-300 h-20 mb-8 line-clamp-3">
                          {article.content 
                            ? `${article.content.substring(0, 300)}${article.content.length > 300 ? '...' : ''}`
                            : 'No description available.'}
                        </Markdown>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.location.href = `/article/${article.name}`}
                          className="relative w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition duration-300 bottom-4"
                        >
                          Read More
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  You haven't written any articles yet.
                </p>
                <Link
                  to="/addarticle"
                  className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Write Your First Article
                </Link>
              </div>
            )}
          </div>

          {/* Saved and Liked Articles Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Saved Articles
              </h3>
              <SaveForLaterArticleList />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Liked Articles
              </h3>
              <LikedArticles likedArticles={user.likedArticles} />
            </div>
          </div>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Delete Account
              </h2>

              {!isOtpSent ? (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Are you sure you want to delete your account? This action cannot be undone.
                    All your data, including articles and comments, will be permanently deleted.
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      Proceed
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Please enter the OTP sent to your email to confirm account deletion.
                  </p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-3 mb-4 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setIsOtpSent(false);
                        setOtp('');
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <TrashIcon className="w-5 h-5" />
                          <span>Confirm Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, className }) => (
  <div className={className}>
    <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">{label}</span>
    <p className="font-medium text-gray-800 dark:text-gray-200">{value}</p>
  </div>
);

export default ProfilePage;
