import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { link } from '../components/Baselink';
import { format } from 'date-fns';

const DraftsPage = () => {
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDrafts();
    }, []);

    const fetchDrafts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${link}/api/article/drafts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDrafts(response.data.drafts);
        } catch (err) {
            setError(err.response?.data?.error || 'Error fetching drafts');
        } finally {
            setLoading(false);
        }
    };

    const handleEditDraft = (draftId) => {
        window.location.href = `/edit-article/${draftId}`;
    };

    const handleDeleteDraft = async (draftId) => {
        if (!window.confirm('Are you sure you want to delete this draft?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${link}/api/article/deletearticle`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { id: draftId }
            });
            setDrafts(drafts.filter(draft => draft._id !== draftId));
        } catch (err) {
            setError(err.response?.data?.error || 'Error deleting draft');
        }
    };

    if (loading) return <div className="text-center p-8">Loading drafts...</div>;
    if (error) return <div className="text-center text-red-600 p-8">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-indigo-800 mb-6">My Drafts</h1>
                
                {drafts.length === 0 ? (
                    <div className="text-center text-gray-600 p-8">
                        No drafts found. Start writing something new!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {drafts.map((draft) => (
                            <div key={draft._id} className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold text-indigo-600">
                                    {draft.title || 'Untitled Draft'}
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Last modified: {format(new Date(draft.updatedAt), 'PPP')}
                                </p>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={() => handleEditDraft(draft._id)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDraft(draft._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DraftsPage; 