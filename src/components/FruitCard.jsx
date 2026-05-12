import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../data/fruits';
import './FruitCard.css';

const Stars = ({ rating }) => (
  <div className="stars" aria-label={`${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`star ${s <= Math.round(rating) ? 'star--filled' : ''}`}>★</span>
    ))}
  </div>
);

const FruitCard = ({ fruit, showToast }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const mainImage = fruit.images?.[0] || '';

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fruit.inStock) return;
    setAdding(true);
    await addToCart(fruit);
    if (showToast) showToast(`${fruit.name} added to cart`);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <Link to={`/fruit/${fruit.id}`} className="fruit-card-link" id={fruit.id}>
      <article className={`fruit-card ${!fruit.inStock ? 'fruit-card--oos' : ''}`}>

        {/* Badge */}
        {fruit.badge && (
          <span className={`fruit-card__badge fruit-card__badge--${fruit.badge.toLowerCase().replace(/\s+/g, '-')}`}>
            {fruit.badge}
          </span>
        )}
        {!fruit.inStock && (
          <span className="fruit-card__badge fruit-card__badge--oos">Out of Stock</span>
        )}

        {/* Image / Emoji */}
        <div
          className="fruit-card__img-wrap"
          style={{ background: `linear-gradient(135deg, ${fruit.color || '#2d5a27'}22, ${fruit.accent || '#4a8a42'}10)` }}
        >
          {mainImage ? (
            <img
              src={getImageUrl(mainImage)}
              alt={fruit.name}
              className="fruit-card__img"
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
          ) : null}
          <span className="fruit-card__emoji">{fruit.emoji || '🍑'}</span>
        </div>

        {/* Body */}
        <div className="fruit-card__body">
          <span className="fruit-card__category">{fruit.category}</span>
          <h3 className="fruit-card__name">{fruit.name}</h3>

          <div className="fruit-card__meta">
            <Stars rating={fruit.rating} />
            <span className="fruit-card__reviews">({fruit.reviews})</span>
          </div>

          <div className="fruit-card__footer">
            <div className="fruit-card__price">
              <span className="fruit-card__price-value">₹{fruit.price}</span>
              <span className="fruit-card__unit">{fruit.unit}</span>
            </div>
            <button
              className={`fruit-card__add ${adding ? 'fruit-card__add--added' : ''}`}
              onClick={handleAdd}
              disabled={!fruit.inStock}
              aria-label={`Add ${fruit.name} to cart`}
            >
              {adding ? '✓' : '+'}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FruitCard;
