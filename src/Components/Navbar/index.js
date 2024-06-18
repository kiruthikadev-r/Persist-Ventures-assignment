import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navbar = ({ category, handleCategoryChange, searchQuery, handleSearchChange }) => {
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
      <div className="category-filter">
        <select value={category} onChange={handleCategoryChange} className="category-select">
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Navbar;
