import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import LikeButton from "../LikeButton";

const LikedArticles = ({ likedArticles }) => {
  if (!likedArticles) return <p className="text-center text-gray-500">Loading...</p>;
  if (likedArticles.length === 0) return <p className="text-center text-gray-500">No liked articles found.</p>;

  return (
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
      className="grid sm:grid-cols-2 gap-6"
    >
      <AnimatePresence>
        {likedArticles.map((article) => (
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
  );
};

export default LikedArticles;
