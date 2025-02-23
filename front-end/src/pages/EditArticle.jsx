import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { link } from "../components/Baselink";

const EditArticle = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const resp = await axios.post(
                    `${link}/api/article/getarticlebyid`,
                    { id },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setTitle(resp.data.title || "");
                setContent(resp.data.content || "");
            } catch (error) {
                console.error("Error fetching article details:", error);
                setError("Failed to fetch article details. Please try again.");
            }
        };
        getDetails();
    }, [id]);

    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", title.trim());
            formData.append("content", content.trim());
            if (thumbnail) {
                console.log("thumbnailllll")
                formData.append("thumbnail", thumbnail);
            }

            console.log(formData)

            const resp = await axios.post(`${link}/api/article/editarticle`, formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Article updated successfully:", resp.data);
            navigate("/article-list");
        } catch (error) {
            console.error("Error updating article:", error);
            setError(
                error.response?.data?.error || "Failed to update the article. Please try again."
            );
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 md:p-6 flex items-center justify-center perspective-1000">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(8,_112,_184,_0.2)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden max-h-[98vh] sm:max-h-[90vh] flex flex-col transition-all duration-300 ease-out">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-yellow-500 dark:to-yellow-400 px-3 sm:px-6 py-3 sm:py-4 animate-gradient-x">
                    <h1 className="text-xl sm:text-2xl font-bold text-white dark:text-gray-900 transform hover:scale-105 transition-transform duration-200">Edit Article</h1>
                    <p className="text-blue-100 dark:text-gray-800 text-xs sm:text-sm opacity-90 hover:opacity-100 transition-opacity duration-200">Update your article details below</p>
                </div>
                
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-2 mx-2 sm:mx-4 mt-2 transform transition-all duration-300 ease-in-out animate-slideIn">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-2">
                                <p className="text-xs text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="flex-1 p-3 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto dark:bg-gray-800" onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}>
                    <div className="transform transition-all duration-200 hover:translate-x-1">
                        <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                            Article Title
                        </label>
                        <div className="mt-1">
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a compelling title"
                                className="block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 text-gray-900 dark:text-gray-100 dark:bg-gray-700 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md focus:shadow-md"
                                required
                            />
                        </div>
                    </div>

                    <div className="transform transition-all duration-200 hover:translate-x-1">
                        <label htmlFor="content" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                            Article Content
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your article content here..."
                                rows={window.innerWidth < 640 ? "6" : "8"}
                                className="block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-blue-500 dark:focus:border-yellow-400 text-gray-900 dark:text-gray-100 dark:bg-gray-700 resize-none shadow-sm transition-all duration-200 ease-in-out hover:shadow-md focus:shadow-md"
                                required
                            />
                        </div>
                    </div>

                    <div className="transform transition-all duration-200 hover:translate-x-1">
                        <label htmlFor="thumbnail" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                            Thumbnail Image
                        </label>
                        <div className="mt-1">
                            <input
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                className="block w-full text-xs sm:text-sm text-gray-500 dark:text-gray-300 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-yellow-500 file:text-blue-700 dark:file:text-gray-900 hover:file:bg-blue-100 dark:hover:file:bg-yellow-400 transition-all duration-200 ease-in-out file:transition-all file:duration-200 file:shadow-sm"
                            />
                            {thumbnail && (
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 animate-fadeIn">
                                    Selected file: {thumbnail.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate("/articles")}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 sm:px-6 py-1.5 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white dark:text-gray-900 bg-blue-600 dark:bg-yellow-500 hover:bg-blue-700 dark:hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition-all duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticle;
