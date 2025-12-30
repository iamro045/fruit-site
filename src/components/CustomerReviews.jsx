import React from 'react';
import { FaStar } from 'react-icons/fa';
import './CustomerReviews.css';

const StarRating = ({ rating }) => {
  const stars = Array(5).fill(0).map((_, index) => (
    <FaStar key={index} color={index < rating ? '#facc15' : '#444'} />
  ));
  return <div className="review-stars">{stars}</div>;
};

const CustomerReviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet. Be the first to review this product!</p>;
  }

  return (
    <div className="customer-reviews-container">
      {reviews.map(review => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <strong className="review-author">{review.author}</strong>
            <span className="review-date">{new Date(review.date).toLocaleDateString('en-IN')}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;