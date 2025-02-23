import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { link } from '../components/Baselink';
import { GettingArticle } from '../Utils/loader';
import { useSelector } from 'react-redux';
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import LikeButton from '../components/LikeButton';
import TidioChat from "../components/Tidio";
import PaginatedArticles from '../components/PaginatedArticle';


const PublicProfile = () => {
    const { userId } = useParams();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [followError, setFollowError] = useState(null);
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [articlesLoading, setArticlesLoading] = useState(true);
    const [articlesError, setArticlesError] = useState(null);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setError(null);
                const response = await axios.get(`${link}/api/auth/user/${userId}`);
                setUser(response.data);
                const tempId = localStorage.getItem("userId")
                if (tempId && response.data.followers) {
                    setIsFollowing(response.data.followers.includes(tempId));
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId, currentUser]);

    useEffect(() => {
        const fetchUserArticles = async () => {
            try {
                setArticlesLoading(true);
                setArticlesError(null);
                const response = await axios.post(
                    `${link}/api/article/getarticlesbyuser`,
                    { uid: userId }
                );
                if (response.data.success) {
                    setArticles(response.data.articleDetails);
                }
            } catch (err) {
                setArticlesError(err.response?.data?.message || 'Failed to fetch articles');
            } finally {
                setArticlesLoading(false);
            }
        };

        if (userId) {
            fetchUserArticles();
        }
    }, [userId, currentPage]);

    const handleFollow = async () => {
        if (!currentUser) {
            setFollowError('Please login to follow users');
            return;
        }

        setFollowLoading(true);
        setFollowError(null);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const endpoint = isFollowing ? 'unfollow' : 'follow';
            const response = await axios.post(
                `${link}/api/auth/${endpoint}/${userId}`,
                {},
                config
            );

            // Update local state
            setIsFollowing(!isFollowing);
            setUser(prev => ({
                ...prev,
                followers: response.data.followers
            }));

            // Clear any existing errors
            setFollowError(null);
        } catch (error) {
            console.error(`Error ${isFollowing ? 'unfollowing' : 'following'} user:`, error);
            setFollowError(error.response?.data?.error || `Failed to ${isFollowing ? 'unfollow' : 'follow'} user`);
            // Don't update isFollowing state if there's an error
        } finally {
            setFollowLoading(false);
        }
    };

    if (loading) return <GettingArticle />;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!user) return <div className="text-center mt-4">User not found</div>;

    return (
        <>
            <TidioChat />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Show follow error if exists */}
                    {followError && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {followError}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
                        {/* Profile Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-6">
                                {/* Profile Picture with Animation */}
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-500 shadow-lg"
                                >
                                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-500 text-transparent bg-clip-text">
                                            {user.username?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </motion.div>

                                <div>
                                    {/* Username */}
                                    <motion.h1
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-500 text-transparent bg-clip-text"
                                    >
                                        {user.username}
                                    </motion.h1>

                                    {/* Full Name */}
                                    {user.name && (
                                        <p className="text-gray-600 dark:text-gray-400 mt-1">{user.name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Follow Button - Only show if viewing another user's profile */}
                            {currentUser && currentUser.userId !== userId && (
                                <motion.button
                                    onClick={handleFollow}
                                    disabled={followLoading}
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className={`
                        flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-full font-semibold
                        text-sm sm:text-base min-w-[120px] sm:min-w-[140px]
                        transition-all duration-300 ease-in-out shadow-md hover:shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                        ${followLoading
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : isFollowing
                                                ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 focus:ring-red-500"
                                                : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-blue-500"
                                        }
                    `}
                                >
                                    {followLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <BiLoaderAlt className="animate-spin h-5 w-5" />
                                            <span className="hidden sm:inline">Processing...</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            {isFollowing ? (
                                                <>
                                                    <FaUserMinus className="h-4 w-4 transition-colors duration-300 text-gray-400 group-hover:text-white" />
                                                    <span>Unfollow</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaUserPlus className="h-4 w-4" />
                                                    <span>Follow</span>
                                                </>
                                            )}
                                        </span>
                                    )}
                                </motion.button>
                            )}
                        </div>

                        {/* Profile Info */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {/** Location **/}
                            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</h2>
                                <p className="text-gray-600 dark:text-gray-400">{user.location || 'Not specified'}</p>
                            </motion.div>

                            {/** Member Since **/}
                            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Member Since</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {new Date(user.accountCreated).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </motion.div>

                            {/** Articles Published **/}
                            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Articles Published</h2>
                                <p className="text-gray-600 dark:text-gray-400">{user.articlesPublished}</p>
                            </motion.div>

                            {/** Age **/}
                            {user.age && (
                                <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md">
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</h2>
                                    <p className="text-gray-600 dark:text-gray-400">{user.age} years</p>
                                </motion.div>
                            )}

                            {/** Followers **/}
                            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Followers</h2>
                                <p className="text-gray-600 dark:text-gray-400">{user.followers?.length || 0}</p>
                            </motion.div>

                            {/** Following **/}
                            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Following</h2>
                                <p className="text-gray-600 dark:text-gray-400">{user.following?.length || 0}</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Articles Section */}
                <div className="container mx-auto px-4 max-w-7xl mt-8">
                    <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-12">
                        Published Articles
                    </h2>

                    {articlesLoading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : articlesError ? (
                        <div className="text-red-500 text-center">{articlesError}</div>
                    ) : articles?.length > 0 ? (
                        <>
                            {/* <motion.div
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
                                    {articles.map((article) => (
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
                                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full text-xs">
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
                                                    variants={{
                                                        initial: {
                                                            opacity: 0,
                                                            scale: 0.9,
                                                            y: 20
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            scale: 1,
                                                            y: 0,
                                                            transition: {
                                                                type: "spring",
                                                                stiffness: 300,
                                                                damping: 10,
                                                                duration: 0.4
                                                            }
                                                        },
                                                        hover: {
                                                            scale: 1.05,
                                                            rotate: [0, -5, 5, 0],
                                                            transition: {
                                                                type: "spring",
                                                                stiffness: 300,
                                                                duration: 0.2
                                                            }
                                                        },
                                                        tap: {
                                                            scale: 0.95,
                                                            transition: { duration: 0.1 }
                                                        }
                                                    }}
                                                    initial="initial"
                                                    animate="animate"
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    onClick={() => window.location.href = `/article/${article.name}`}
                                                    className="relative w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition duration-300 bottom-4"
                                                >
                                                    Read More
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div> */}
                            <PaginatedArticles articles={articles} />

                            {/* Pagination Controls */}
                            {/* {totalPages > 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-center items-center gap-2 mt-8 mb-4 text-sm"
                                >
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-2 py-1 ${currentPage === 1
                                            ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
                                            : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
                                            } transition-colors duration-200`}
                                    >
                                        ← Prev
                                    </button>

                                    <div className="flex gap-1">
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => setCurrentPage(index + 1)}
                                                className={`w-8 h-8 rounded-full transition-colors duration-200 ${currentPage === index + 1
                                                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300'
                                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50'
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`px-2 py-1 ${currentPage === totalPages
                                            ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
                                            : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
                                            } transition-colors duration-200`}
                                    >
                                        Next →
                                    </button>
                                </motion.div>
                            )} */}

                            {/* Articles Count */}
                            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                                Showing {articles.length} articles
                            </p>
                        </>
                    ) : (
                        <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
                            No articles published yet by this user
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PublicProfile; 