import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import FruitList from '../components/FruitList';
import InfoBar from '../components/InfoBar';
import OfferBanner from '../components/OfferBanner';
import CustomerReviews from '../components/CustomerReviews';
import CategoryFilter from '../components/CategoryFilter';
import { FRUITS_STATIC } from '../data/fruits';
import './HomePage.css';

const CATEGORIES_DISPLAY = [
  { emoji: '🍋', name: 'Citrus',    color: '#e67e22' },
  { emoji: '🍇', name: 'Berry',     color: '#8e44ad' },
  { emoji: '🥭', name: 'Tropical',  color: '#27ae60' },
  { emoji: '🍎', name: 'Temperate', color: '#e74c3c' },
];

const SectionHeader = ({ label, title, cta, ctaLink }) => (
  <div className="section-header">
    <div>
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
    </div>
    {cta && <Link to={ctaLink || '/shop'} className="section-cta">{cta}</Link>}
  </div>
);

const HomePage = ({ searchTerm, showToast }) => {
  const [allFruits, setAllFruits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5001/api/fruits')
      .then(res => setAllFruits(res.data))
      .catch(() => setAllFruits(FRUITS_STATIC)); // fallback to static data
  }, []);

  const filtered = allFruits
    .filter(f => selectedCategory === 'All' || f.category === selectedCategory)
    .filter(f => !searchTerm || f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const featured    = allFruits.filter(f => f.badge).slice(0, 4);
  const bestsellers = allFruits.filter(f => f.inStock).sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <>
      <Hero />
      <InfoBar />

      {/* Featured Section */}
      <section className="home-section">
        <SectionHeader label="Handpicked" title='Featured <em style="color:var(--gold);font-style:italic">Picks</em>' cta="View all →" />
        <FruitList fruits={featured.length ? featured : allFruits.slice(0, 4)} showToast={showToast} />
      </section>

      {/* Category Showcase */}
      <section className="home-section">
        <SectionHeader label="Browse" title='By <em style="color:var(--gold);font-style:italic">Category</em>' />
        <div className="category-grid">
          {CATEGORIES_DISPLAY.map(({ emoji, name, color }) => (
            <Link
              to={`/shop?cat=${name}`}
              key={name}
              className="category-tile"
              style={{ '--cat-color': color }}
            >
              <span className="category-tile__emoji">{emoji}</span>
              <span className="category-tile__name">{name}</span>
              <span className="category-tile__count">
                {allFruits.filter(f => f.category === name).length} varieties
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="home-section">
        <OfferBanner />
      </section>

      {/* Bestsellers */}
      <section className="home-section">
        <SectionHeader label="Most Loved" title="Bestsellers" cta="View all →" />
        <FruitList fruits={bestsellers.length ? bestsellers : allFruits.slice(0, 4)} showToast={showToast} />
      </section>

      {/* Full shop with filter */}
      <section className="home-section">
        <SectionHeader label="Our Selection" title='All <em style="color:var(--leaf-light);font-style:italic">Fruits</em>' />
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <FruitList fruits={filtered} showToast={showToast} />
      </section>

      <CustomerReviews />
    </>
  );
};

export default HomePage;
