import React from 'react';
import Modal from 'react-modal';

const AddComment = ({
    isOpen,
    onClose,
    onSubmit,
    comment,
    setComment
}) => {
    // Add handler for keyboard submission
    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add Comment Modal"
            className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-2xl mx-auto mt-16 shadow-xl outline-none relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto p-4"
            ariaHideApp={false}
            // Add accessibility improvements
            role="dialog"
            aria-modal="true"
            aria-labelledby="comment-modal-title"
        >
            <h2 
                id="comment-modal-title" 
                className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100"
            >
                Add a Comment
            </h2>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write your comment here... (Ctrl + Enter to submit)"
                className="w-full border dark:border-gray-600 rounded p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 min-h-[120px] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                rows={6}
                aria-label="Comment text"
                required
            />
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors focus:ring-2 focus:ring-gray-500 focus:outline-none text-gray-800 dark:text-gray-200"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={onSubmit}
                    disabled={!comment.trim()}
                >
                    Submit
                </button>
            </div>
        </Modal>
    );
};

export default AddComment;
