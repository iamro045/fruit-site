import React from 'react';
import FruitCard from './FruitCard';
import './FruitList.css';

const FruitList = ({ fruits, showToast }) => {
  if (!fruits || fruits.length === 0) {
    return (
      <div className="fruit-list--empty">
        <span>🔍</span>
        <p>No fruits found. Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="fruit-list">
      {fruits.map((fruit, i) => (
        <div
          key={fruit.id || fruit._id}
          className="fruit-list__item"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <FruitCard fruit={fruit} showToast={showToast} />
        </div>
      ))}
    </div>
  );
};

export default FruitList;
