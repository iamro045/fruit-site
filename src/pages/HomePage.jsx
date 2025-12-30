import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 1. Import axios
import FruitList from '../components/FruitList';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter'; 
import OfferBanner from '../components/OfferBanner';

const HomePage = ({ searchTerm }) => { 
  const [allFruits, setAllFruits] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Citrus', 'Berry', 'Tropical', 'Temperate'];

  // 2. Updated this useEffect to fetch from your backend API
  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/fruits');
        setAllFruits(response.data); // With axios, the data is in response.data
      } catch (error) {
        console.error('Error fetching fruits from API:', error);
      }
    };
    
    fetchFruits();
  }, []);

  useEffect(() => {
    let results = allFruits;

    if (selectedCategory !== 'All') {
      results = results.filter(fruit => fruit.category === selectedCategory);
    }

    if (searchTerm) {
      results = results.filter(fruit =>
        fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredFruits(results);

    // Scroll to search result logic
    if (searchTerm && results.length > 0) {
      setTimeout(() => {
        const firstResultId = results[0].id;
        const element = document.getElementById(firstResultId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [searchTerm, selectedCategory, allFruits]);

  return (
    <>
      <Hero />
      <OfferBanner />
      <main className="home-main-content">
        <h2 className="section-title">Our Freshest Selection</h2>
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <FruitList fruits={filteredFruits} />
      </main>
    </>
  );
};

export default HomePage;