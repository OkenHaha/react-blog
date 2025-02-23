import React from 'react';
import { Link } from 'react-router-dom';

const Articles = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p className="text-gray-500">No articles available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link to={`/article/${article.name}`}
          key={article._id}
          className="bg-green-100 border border-green-300 rounded-lg shadow-md p-4 flex flex-col"
        >
          {/* Article Thumbnail */}
          <div className="mb-4">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-40 object-cover rounded-md"
            />
          </div>

          {/* Article Title */}
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            {article.title}
          </h2>

          {/* Article Content */}
          <div className="text-sm text-green-700 mb-4 flex-1 overflow-hidden">
            <p
              className="overflow-y-auto max-h-24 pr-2"
              style={{ scrollbarWidth: 'thin' }}
            >
              {article.content 
                ? `${article.content.substring(0, 300)}${article.content.length > 300 ? '...' : ''}`
                : 'No content available.'}
            </p>
          </div>

          {/* Author */}
          <p className="text-xs text-green-600">
            Author ID: {article.authorName ? article.authorName : article.author}
          </p>

          {/* tag */}
          <p>
            Tag: <Link>{article.tag ? article.tag : none }</Link>
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Articles;
