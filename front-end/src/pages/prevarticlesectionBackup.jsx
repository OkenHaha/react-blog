      {/* previous article section */}
      <div className="articles-section">
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-8">Your Published Articles</h2>
        <div className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userArticles.map(article => (
            <div
              key={article._id}
              className="article-card p-6 rounded-xl shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-400 border-2 border-transparent">
              {/* Thumbnail */}
              {article.thumbnail && (
                <img
                  src={article.thumbnail}
                  alt={`${article.title} Thumbnail`}
                  className="w-full h-48 object-cover rounded-t-lg mb-4 transform transition-transform duration-300 hover:scale-110"
                />
              )}

              {/* Article Content */}
              <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-300 mb-3">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-6">
                {article.content ?
                  (article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content)
                  : 'No description available.'}
              </p>
              <div className="text-right">
                <button
                  onClick={() => navigate(`/article/${article.name}`)}
                  className="text-blue-500 underline transform transition-all duration-300 hover:scale-110 hover:text-indigo-600"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>