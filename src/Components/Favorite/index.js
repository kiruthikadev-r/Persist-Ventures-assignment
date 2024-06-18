import React from 'react';
import './index.css';

const Favorite = ({ favorites, setFavorites }) => {
  const handleRemoveFavorite = (index) => {
    const updatedFavorites = favorites.filter((item, i) => i !== index);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites">
      <h2 className="favorites-title">Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((article, index) => (
          <div key={index} className="article-card">
            <img 
              src={article.urlToImage || 'https://via.placeholder.com/150'} 
              alt={article.title} 
              onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
              className="article-image"
            />
            <h2 className="article-title">{article.title}</h2>
            <p className="article-description">{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
              Read full article
            </a>
            <button onClick={() => handleRemoveFavorite(index)} className="remove-button">
              Remove
            </button>
          </div>
        ))
      ) : (
        <div className="no-favorites">No favorites yet.</div>
      )}
    </div>
  );
};

export default Favorite;
