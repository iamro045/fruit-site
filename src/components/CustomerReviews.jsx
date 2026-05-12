import React from 'react';
import './CustomerReviews.css';

const REVIEWS = [
  { name: 'Priya M.',  city: 'Mumbai',     emoji: '🥭', text: 'The Alphonso mangoes are absolutely divine. Best I\'ve tasted outside Ratnagiri!' },
  { name: 'Arjun K.',  city: 'Pune',       emoji: '🍎', text: 'Super fresh, great packaging, and delivery was on time. Ordering every week now!' },
  { name: 'Sneha R.',  city: 'Aurangabad', emoji: '🍊', text: 'Love the variety. The Navel oranges are so juicy. My kids can\'t get enough!' },
];

const CustomerReviews = () => (
  <section className="reviews">
    <div className="reviews__header">
      <span className="reviews__label">Reviews</span>
      <h2 className="reviews__title">What Our Customers Say</h2>
    </div>
    <div className="reviews__grid">
      {REVIEWS.map((r) => (
        <div key={r.name} className="review-card">
          <div className="review-card__stars">{'★★★★★'}</div>
          <p className="review-card__text">"{r.text}"</p>
          <div className="review-card__author">
            <div className="review-card__avatar">{r.emoji}</div>
            <div>
              <div className="review-card__name">{r.name}</div>
              <div className="review-card__city">{r.city}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CustomerReviews;
