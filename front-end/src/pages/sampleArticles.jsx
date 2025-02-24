import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Sam() {
  const [blogs, setBlogs] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);

  // Fetching blogs data from the JSON file
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/src/assets/sampleBlogs.json');
      const data = await response.json();
      setBlogs(data.blogs);
    };

    fetchBlogs();
  }, []);

  // Handle like button
  const handleLike = (name) => {
    if (likedArticles.includes(name)) {
      setLikedArticles(likedArticles.filter((article) => article !== name));
    } else {
      setLikedArticles([...likedArticles, name]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Check for no articles state */}
      {blogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="notfound opacity-50 mt-[-120px]">
            <img
              src="/path/to/NoarticleImage.png"
              alt="No articles"
              className="mx-auto w-64 h-64 opacity-70"
            />
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              No Articles Found - Explore Sample Articles
            </h2>
            <p className="text-gray-500">
              Check back later or start writing your first article!
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-base mb-4">
                  {blog.content[0]}...
                </p>
                <div className="flex items-center justify-between">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(blog.name)}
                    className={`${
                      likedArticles.includes(blog.name)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    } flex items-center px-4 py-2 rounded-full transition-colors`}
                  >
                    <span
                      className={`mr-2 ${
                        likedArticles.includes(blog.name)
                          ? 'text-white'
                          : 'text-gray-800'
                      }`}
                    >
                      👍
                    </span>
                    {likedArticles.includes(blog.name) ? 'Liked' : 'Like'}
                  </button>
                  {/* Read More Button */}
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sam;
