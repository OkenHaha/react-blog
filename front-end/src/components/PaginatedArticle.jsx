import { useState } from "react";
import { motion } from "framer-motion";

const PaginatedArticles = ({ articles, articlesPerPage = 3 }) => {
    console.log(articles)
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    
    const startIndex = (currentPage - 1) * articlesPerPage;
    const displayedArticles = articles.slice(startIndex, startIndex + articlesPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
                {displayedArticles.map((article, index) => (
                    <motion.div
                        key={article.id || index}
                        className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img 
                            src={article.thumbnail} 
                            alt={article.title} 
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                {article.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                                {article.summary}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 transition"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-gray-800 dark:text-gray-200">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 transition"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginatedArticles;
