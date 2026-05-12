import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const FLOATERS = [
  { e: '🍎', x: '6%',  y: '22%', delay: 0   },
  { e: '🥭', x: '88%', y: '18%', delay: 0.6 },
  { e: '🍋', x: '4%',  y: '68%', delay: 1.1 },
  { e: '🍇', x: '91%', y: '65%', delay: 0.3 },
  { e: '🍊', x: '14%', y: '82%', delay: 0.9 },
  { e: '🍍', x: '80%', y: '80%', delay: 1.5 },
];

const Hero = () => (
  <section className="hero">
    {/* BG orbs */}
    <div className="hero__orb hero__orb--green" />
    <div className="hero__orb hero__orb--gold" />

    {/* Floating fruit emojis */}
    {FLOATERS.map((f, i) => (
      <span
        key={i}
        className="hero__floater"
        style={{ left: f.x, top: f.y, animationDelay: `${f.delay}s` }}
      >
        {f.e}
      </span>
    ))}

    {/* Content */}
    <div className="hero__content">
      <div className="hero__badge">
        <span className="hero__badge-dot" />
        Farm Fresh · Same Day Delivery
      </div>

      <h1 className="hero__title">
        Nature's Finest,<br />
        <em>Delivered</em> to You
      </h1>

      <p className="hero__subtitle">
        Hand-picked seasonal fruits sourced directly from India's finest farms.
        Because you deserve nothing but the best.
      </p>

      <div className="hero__ctas">
        <Link to="/shop" className="btn btn--primary">Shop Now →</Link>
        <Link to="/about" className="btn btn--ghost">Our Story</Link>
      </div>

      <div className="hero__stats">
        {[['500+', 'Happy Customers'], ['12', 'Premium Varieties'], ['24h', 'Fresh Delivery']].map(
          ([n, l]) => (
            <div key={n} className="hero__stat">
              <span className="hero__stat-num">{n}</span>
              <span className="hero__stat-label">{l}</span>
            </div>
          )
        )}
      </div>
    </div>
  </section>
);

export default Hero;
