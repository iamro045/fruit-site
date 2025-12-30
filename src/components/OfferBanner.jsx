import React from 'react';
import { Link } from 'react-router-dom';
import { FiPercent, FiGift } from 'react-icons/fi'; // Example icons
import './OfferBanner.css';

const OfferBanner = () => {
  return (
    <section className="offer-banner-section">
      <div className="offer-banner-container">
        <Link to="/" className="offer-card citrus-offer">
          <FiPercent className="offer-icon" />
          <div className="offer-text">
            <h3>Citrus Fest</h3>
            <p>Flat 15% off on all Oranges & Lemons</p>
          </div>
        </Link>
        <Link to="/" className="offer-card weekend-offer">
          <FiGift className="offer-icon" />
          <div className="offer-text">
            <h3>Weekend Special</h3>
            <p>Free box of Strawberries on orders over ₹1000</p>
          </div>
        </Link>
        {/* You can add more offer cards here */}
      </div>
    </section>
  );
};

export default OfferBanner;