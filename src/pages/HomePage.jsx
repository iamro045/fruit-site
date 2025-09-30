import React, { useState, useEffect } from 'react';
import FruitList from '../components/FruitList';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter'; // 1. Import the new component

const HomePage = ({ searchTerm }) => { 
  const [allFruits, setAllFruits] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // 2. Add state for category

  const categories = ['All', 'Citrus', 'Berry', 'Tropical', 'Temperate']; // Define categories

  useEffect(() => {
    fetch('/fruits.json')
      .then(response => response.json())
      .then(data => {
        setAllFruits(data);
      })
      .catch(error => console.error('Error fetching fruits:', error));
  }, []);

  // 3. Update the filtering logic to use BOTH search and category
  useEffect(() => {
    let results = allFruits;

    // Filter by category first
    if (selectedCategory !== 'All') {
      results = results.filter(fruit => fruit.category === selectedCategory);
    }

    // Then filter by search term
    if (searchTerm) {
      results = results.filter(fruit =>
        fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredFruits(results);
  }, [searchTerm, selectedCategory, allFruits]);

  return (
    <>
      <Hero />
      <main className="home-main-content">
        <h2 className="section-title">Our Freshest Selection</h2>

        {/* 4. Add the CategoryFilter component */}
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