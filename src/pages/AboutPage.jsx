import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => (
  <section className="about-page">
    <div className="about-hero">
      <div className="about-hero__emoji">🌳</div>
      <h1 className="about-hero__title">Our <em>Story</em></h1>
      <p className="about-hero__sub">
        Groott was born from a simple belief: everyone deserves access to genuinely fresh, farm-grown fruits without the hassle of going to the market.
      </p>
    </div>

    <div className="about-grid">
      {[
        { emoji:'🌱', title:'Farm to Door', text:'We partner directly with farmers across India — cutting middlemen so you get fresher produce at fairer prices.' },
        { emoji:'🤝', title:'Farmer First', text:'Every purchase supports local farming families. We pay fair trade prices and build long-term relationships.' },
        { emoji:'🔬', title:'Quality Tested', text:'Every batch is tested for pesticides and quality graded before it reaches your doorstep.' },
        { emoji:'♻️', title:'Eco Packaging', text:'We use 100% biodegradable packaging because we love the earth as much as we love fruit.' },
      ].map(item => (
        <div key={item.title} className="about-card">
          <div className="about-card__emoji">{item.emoji}</div>
          <h3 className="about-card__title">{item.title}</h3>
          <p className="about-card__text">{item.text}</p>
        </div>
      ))}
    </div>

    <div className="about-cta">
      <h2>Ready to taste the difference?</h2>
      <p>Join 500+ happy customers who've made the switch to fresher, better fruit.</p>
      <Link to="/shop" className="btn btn--primary">Shop Now →</Link>
    </div>
  </section>
);

export default AboutPage;
