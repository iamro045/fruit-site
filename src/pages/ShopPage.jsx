import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FruitList from '../components/FruitList';
import CategoryFilter from '../components/CategoryFilter';
import OfferBanner from '../components/OfferBanner';
import { FRUITS_STATIC } from '../data/fruits';
import './ShopPage.css';

const ShopPage = ({ searchTerm, showToast }) => {
  const [allFruits, setAllFruits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/fruits`)
      .then(res => setAllFruits(res.data))
      .catch(() => setAllFruits(FRUITS_STATIC))
      .finally(() => setLoading(false));
  }, []);

  let fruits = allFruits
    .filter(f => selectedCategory === 'All' || f.category === selectedCategory)
    .filter(f => !searchTerm || f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (sort === 'price-asc')  fruits = [...fruits].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') fruits = [...fruits].sort((a, b) => b.price - a.price);
  if (sort === 'rating')     fruits = [...fruits].sort((a, b) => b.rating - a.rating);

  return (
    <section className="shop-page">
      <div className="shop-page__header">
        <h1 className="shop-page__title">
          Our Freshest <em>Selection</em>
        </h1>
        <p className="shop-page__sub">
          {fruits.length} varieties available · Hand-picked daily
        </p>
      </div>

      <div className="shop-page__inner">
        <OfferBanner />

        <div className="shop-page__controls">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          <select
            className="shop-sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>

        {loading ? (
          <div className="shop-loading">
            <span className="shop-loading__spinner" />
            <p>Loading fresh fruits…</p>
          </div>
        ) : (
          <FruitList fruits={fruits} showToast={showToast} />
        )}
      </div>
    </section>
  );
};

export default ShopPage;
