import React, { useState } from 'react';
import axios from 'axios';
import { link } from '../components/Baselink';
import { CreatingArticleLoader } from '../Utils/loader';
import MDEditor from '@uiw/react-md-editor';
import { HiOutlinePhotograph, HiTag, HiX } from 'react-icons/hi';
import { FiEdit3 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AddArticlePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        thumbnail: '',
        tag: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editorMode, setEditorMode] = useState('normal');
    const [savingDraft, setSavingDraft] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'thumbnail') {
            setFormData({ ...formData, thumbnail: files[0] });
            // Create preview URL for the selected image
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleContentChange = (value) => {
        setFormData({ ...formData, content: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) data.append(key, formData[key]);
            });

            await axios.post(
                `${link}/api/article/addarticle`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            window.location.href = '/article-list';
        } catch (err) {
            setError(err.response?.data?.error || 'Error creating article');
        }
        setLoading(false);
    };

    const handleSaveDraft = async (e) => {
        e.preventDefault();
        setSavingDraft(true);
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key]) data.append(key, formData[key]);
            });

            await axios.post(
                `${link}/api/article/create-draft`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            window.location.href = '/drafts';
        } catch (err) {
            setError(err.response?.data?.error || 'Error saving draft');
        }
        setSavingDraft(false);
    };

    if (loading || savingDraft) return <CreatingArticleLoader />;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto my-4">
                <motion.div 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-10"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Create New Article
                        </h1>
                        <FiEdit3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-xl"
                        >
                            <div className="flex items-center">
                                <HiX className="w-5 h-5 mr-2" />
                                {error}
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter an engaging title..."
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* Editor Mode Toggle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Editor Mode
                            </label>
                            <div className="flex space-x-4">
                                {['normal', 'markdown'].map((mode) => (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setEditorMode(mode)}
                                        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                            editorMode === mode
                                                ? 'bg-indigo-600 dark:bg-purple-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Content
                            </label>
                            {editorMode === 'normal' ? (
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                    placeholder="Start writing your article..."
                                    rows="12"
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                />
                            ) : (
                                <div data-color-mode="dark">
                                    <MDEditor
                                        value={formData.content}
                                        onChange={handleContentChange}
                                        preview="edit"
                                        height={400}
                                        className="rounded-xl overflow-hidden"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Thumbnail Image
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <label className="flex justify-center px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-indigo-500 dark:hover:border-purple-500 transition-colors">
                                        <div className="flex items-center space-x-2">
                                            <HiOutlinePhotograph className="w-6 h-6 text-gray-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {formData.thumbnail ? 'Change Image' : 'Upload Image'}
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            name="thumbnail"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {previewImage && (
                                    <div className="relative w-20 h-20">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreviewImage(null);
                                                setFormData({ ...formData, thumbnail: null });
                                            }}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <HiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tag Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Article Tag
                            </label>
                            <div className="relative">
                                <HiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    name="tag"
                                    value={formData.tag}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
                                >
                                    <option value="" disabled>Select a tag</option>
                                    <option value="Tech">Technology</option>
                                    <option value="Music">Music</option>
                                    <option value="Game">Gaming</option>
                                    <option value="Movies">Movies</option>
                                    <option value="Books">Books</option>
                                    <option value="Food">Food</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Health">Health</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Narratives">Narratives</option>
                                    <option value="Trending-Topics">Trending-Topics</option>
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => window.location.href = '/article-list'}
                                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-600 dark:hover:to-indigo-600 transition-all duration-200"
                            >
                                Save as Draft
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-200"
                            >
                                Publish Article
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AddArticlePage;
