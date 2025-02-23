import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PaginatedComponent = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    
    <h2 className="text-purple-600 text-2xl font-bold mb-4 text-center underline">Published Articles</h2>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="paginated-container p-6 rounded-lg shadow-lg"
    >
      <motion.div 
        className="items-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {selectedItems.map((item) => (
          <motion.div 
            key={item._id} 
            className="item-style bg-white p-4 rounded-lg shadow-md border border-gray-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {item.thumbnail && (
              <motion.img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-40 object-cover rounded-t-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <Link to={`/article/${item.name}`}>
                <h3 className="text-lg font-bold text-gray-800 mt-2">{item.title}</h3>
                <p className="text-gray-600 mt-2">{truncateText(item.content, 150)}</p>
                <p className="text-sm text-gray-500 mt-1"><strong>Author:</strong> {item.name}</p>
                <p className="text-sm text-gray-500"><strong>Status:</strong> {item.status}</p>
                <p className="text-sm text-gray-500"><strong>Likes:</strong> {item.likes}</p>
                <p className="text-sm text-gray-500"><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <div className="pagination-controls flex justify-center items-center mt-4 space-x-2">
        <motion.button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
          whileTap={{ scale: 0.9 }}
        >
          Prev
        </motion.button>
        <span className="page-number text-gray-700 font-medium">{currentPage} / {totalPages}</span>
        <motion.button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600"
          whileTap={{ scale: 0.9 }}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
    </>
  );
};

export default PaginatedComponent;
