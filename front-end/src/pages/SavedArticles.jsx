import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import LikeButton from "../components/LikeButton";

const SavedArticles = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("SavedArray")) || [];
    setFilteredArticles(saved);
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mt-20"></div>
        <h2 className="text-3xl font-bold text-center text-indigo-800 dark:text-indigo-200 mb-10">
          Your Saved Articles
        </h2>

        {filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-64 h-64 mb-8">
              <img
                src="/src/assets/noarticle.png"
                alt="No articles"
                className="w-full h-full object-contain opacity-70"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              No saved articles yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500 text-center mb-8 max-w-md">
              Start exploring and save articles that interest you. They'll appear here for easy access.
            </p>
            <a
              href="/article-list"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <span>Explore Articles</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </a>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredArticles.map((article) => (
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
        )}
      </div>
    </div>
  );
};

export default SavedArticles;
