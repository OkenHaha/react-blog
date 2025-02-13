import { useEffect, useState } from "react";
import { link } from "../Baselink";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleDetailsModal from "../ArticledetailsModal";

const SaveForLaterArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${link}/api/article/getsavedlarticles`, { headers: { authorization: localStorage.getItem("token") } });
        setArticles(response.data.fetchedArticles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const removeArticle = async (articleId) => {
    try {
      await axios.post(`${link}/api/article/removeSavedArticle`, { id: articleId }, { headers: { authorization: localStorage.getItem("token") } });
      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
    } catch (err) {
      console.error("Error removing article:", err);
    }
  };

  if (loading) return <p className="text-blue-500 animate-pulse">Loading articles...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (articles.length === 0) return <p className="text-blue-300">No saved articles found.</p>;

  return (
    <div className="mb-4 p-6 rounded-lg  shadow-md overflow-x-auto">
      <h2 className="text-purple-600 text-2xl font-bold mb-4 text-center underline">Saved Articles</h2>
      <motion.div 
        className="flex space-x-6 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {articles.map((article) => (
          <motion.div
            key={article._id}
            className=" hover:border-2 hover:border-blue-400 bg-white p-6  rounded-lg min-w-[320px] max-w-sm flex-shrink-0 relative group shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-48 object-cover rounded-md mb-2 border border-gray-300"
              whileHover={{ scale: 1.05 }}
            />
            <h3 className="text-blue-600 text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-black truncate">
              {article.content.length > 300 
                ? article.content.substring(0, 300) + '...' 
                : article.content}
            </p>
            <motion.div
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeArticle(article._id)}
              whileHover={{ scale: 1.2 }}
            >
              <FaTrash size={16} />
            </motion.div>
            <motion.button 
              onClick={() => setSelectedArticle(article)}
              className="mt-4 bg-white text-blue-600 font-bold py-2 px-4 rounded-lg shadow-md transition hover:bg-blue-100"
              whileHover={{ scale: 1.1 }}
            >
              Read More
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {selectedArticle && (
        <ArticleDetailsModal
          isOpen={Boolean(selectedArticle)}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          content={selectedArticle.content}
          image={selectedArticle.thumbnail}
        />
      )}
    </div>
  );
};

export default SaveForLaterArticleList;
