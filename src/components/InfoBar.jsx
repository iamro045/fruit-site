import React from 'react';
import './InfoBar.css';

const ITEMS = [
  { emoji: '🚚', title: 'Free Delivery',       sub: 'On orders above ₹500' },
  { emoji: '🌱', title: '100% Organic',         sub: 'No pesticides' },
  { emoji: '✓',  title: 'Quality Guaranteed',  sub: 'Or money back' },
  { emoji: '❄️', title: 'Cold Chain',           sub: 'Always fresh' },
];

const InfoBar = () => (
  <div className="info-bar">
    {ITEMS.map((item) => (
      <div key={item.title} className="info-bar__item">
        <span className="info-bar__emoji">{item.emoji}</span>
        <div>
          <div className="info-bar__title">{item.title}</div>
          <div className="info-bar__sub">{item.sub}</div>
        </div>
      </div>
    ))}
  </div>
);

export default InfoBar;
