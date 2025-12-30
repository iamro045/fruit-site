import React from 'react';
import { Link } from 'react-router-dom';
import './FruitCard.css';

const getImageUrl = (name) => {
  return `http://localhost:5001/assets/${name}`;
};
const FruitCard = ({ fruit }) => {
  const mainImage = fruit.images && fruit.images.length > 0 ? fruit.images[0] : '';

  return (
    <Link to={`/fruit/${fruit.id}`} className="fruit-card-link">
      {/* Add the fruit's unique ID to this div */}
      <div className="fruit-card" id={fruit.id}>
        <img 
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