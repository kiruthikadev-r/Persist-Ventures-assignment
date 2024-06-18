import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');

  const fetchArticles = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=ac6661299ac54f478b2a6f128b323677`
      );
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(category);
  }, [category]);

  return (
    <ArticleContext.Provider value={{ articles, loading, error, setCategory, category }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleProvider;
