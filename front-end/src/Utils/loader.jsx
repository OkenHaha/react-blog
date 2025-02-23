import React from 'react';

const CreatingArticleLoader = () => {
    return (
        <div className="creating-loader">
            <div className="loader"></div>
            <span className="loading creating-article-loader">Creating Your Article</span>
        </div>
    );
};

const GettingArticle = () => {
    return (
        <div className="creating-loader">
            <div className="loader"></div>
            <span className="loading creating-article-loader">Getting Article</span>
        </div>
    );
}


const LoadingSpinner = () => {
    return (
        <div className="creating-loader">
            <div className="loader"></div>
            <span className="loading">Loading Content</span>
        </div>
    );
};


export { CreatingArticleLoader,GettingArticle , LoadingSpinner};