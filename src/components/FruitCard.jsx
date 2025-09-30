import React from 'react';
import { Link } from 'react-router-dom';
import './FruitCard.css';

const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

const FruitCard = ({ fruit }) => {
  // A small check to make sure there is an image to display
  const mainImage = fruit.images && fruit.images.length > 0 ? fruit.images[0] : '';

  return (
    <Link to={`/fruit/${fruit.id}`} className="fruit-card-link">
      <div className="fruit-card">
        <img 
          // Use the first image from the 'images' array
          src={getImageUrl(mainImage)} 
          alt={fruit.name} 
          className="fruit-card-image" 
        />
        <div className="fruit-card-body">
          <h3 className="fruit-card-title">{fruit.name}</h3>
          <p className="fruit-card-price">₹{fruit.price} <span className="fruit-card-unit">{fruit.unit}</span></p>
        </div>
      </div>
    </Link>
  );
};

export default FruitCard;