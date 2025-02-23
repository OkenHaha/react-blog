import React from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const ArticleModal = ({ isOpen, onClose, title, content, image }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10  inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full relative border-4 border-blue-500"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
        >
          <AiOutlineClose size={24} />
        </button>
        <motion.img 
          src={image || "https://via.placeholder.com/800"} 
          alt={title} 
          className="w-full h-80 object-cover rounded-lg border border-gray-300"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          whileHover={{ scale: 1.05 }}
        />
        <motion.h2 
          className="text-4xl font-bold mt-6 text-gray-800 border-b-4 border-blue-500 pb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="mt-4 text-gray-700 leading-relaxed text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {content}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ArticleModal;
