import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleProvider, { ArticleContext } from './Components/ArticleProvider';
import Homepage from './Components/Homepage';
import Favorite from './Components/Favorite';
import Navbar from './Components/Navbar';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <ArticleProvider>
        <NavbarContainer favorites={favorites} setFavorites={setFavorites} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </ArticleProvider>
    </Router>
  );
}

const NavbarContainer = ({ favorites, setFavorites, searchQuery, setSearchQuery }) => {
  const { category, setCategory } = useContext(ArticleContext);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Navbar
        category={category}
        handleCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <Routes>
        <Route path="/" element={<Homepage favorites={favorites}  searchQuery={searchQuery} setFavorites={setFavorites} />} />
        <Route path="/favorites" element={<Favorite favorites={favorites} setFavorites={setFavorites} />} />
      </Routes>
    </>
  );
};

export default App;
