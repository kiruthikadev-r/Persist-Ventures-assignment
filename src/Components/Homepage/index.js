import React, { useContext, useState } from 'react';
import { ArticleContext } from '../ArticleProvider';
import { Circles } from 'react-loader-spinner';
import './index.css'; 

const Homepage = ({ favorites, setFavorites, searchQuery }) => {
  const { articles, loading, error } = useContext(ArticleContext);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const handleFavoriteToggle = (article) => {
    if (favorites.some(fav => fav.title === article.title)) {
      setFavorites(favorites.filter(fav => fav.title !== article.title));
    } else {
      setFavorites([...favorites, article]);
    }
  };

  const filteredArticles = articles.filter(article => {
    const title = article.title ? article.title.toLowerCase() : '';
    const description = article.description ? article.description.toLowerCase() : '';
    const query = searchQuery ? searchQuery.toLowerCase() : '';

    return title.includes(query) || description.includes(query);
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-number ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="homepage">
      <div className="articles">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <div key={index} className="article">
              <img
                src={article.urlToImage || 'https://via.placeholder.com/150'}
                alt={article.title || 'Article Image'}
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                className="article-image"
              />
              <h2 className="article-title">{article.title}</h2>
              <p className="article-description">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
                Read full article
              </a>
              <button onClick={() => handleFavoriteToggle(article)} className="favorite-button">
                {favorites.some(fav => fav.title === article.title) ? '★' : '☆'}
              </button>
            </div>
          ))
        ) : (
          <div className="no-articles">No articles available.</div>
        )}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)} className="page-button">Prev</button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)} className="page-button">Next</button>
        )}
      </div>
    </div>
  );
};

export default Homepage;
