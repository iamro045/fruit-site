import React from 'react';
import './Hero.css';
import { FaChevronDown } from 'react-icons/fa'; // 1. Import the icon

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Fresh Fruits, Delivered Fast</h1>
        <p className="hero-subtitle">
          Discover the best quality, seasonal fruits picked just for you.
        </p>
        <button className="hero-button">Shop Now</button>
      </div>
      {/* 2. Add the scroll down icon at the bottom */}
      <div className="scroll-down-indicator">
        <FaChevronDown />
      </div>
    </div>
  );
};

export default Hero;