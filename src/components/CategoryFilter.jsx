import React from 'react';
import { CATEGORIES } from '../data/fruits';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => (
  <div className="category-filter">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        className={`category-btn ${selectedCategory === cat ? 'category-btn--active' : ''}`}
        onClick={() => onSelectCategory(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
