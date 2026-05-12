import React from 'react';
import './OfferBanner.css';

const OfferBanner = () => (
  <div className="offer-banner">
    <div className="offer-banner__bg-leaf">🌿</div>
    <div className="offer-banner__text">
      <span className="offer-banner__label">Limited Offer</span>
      <h3 className="offer-banner__title">Get 10% off your first order</h3>
      <p className="offer-banner__sub">
        Use code <strong className="offer-banner__code">FRUIT10</strong> at checkout
      </p>
    </div>
    <div className="offer-banner__pill">Claim Offer</div>
  </div>
);

export default OfferBanner;
