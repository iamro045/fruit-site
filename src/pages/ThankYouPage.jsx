// src/pages/ThankYouPage.jsx
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="thank-you-container">
      <FaCheckCircle className="success-icon" />
      <h1>Thank You For Your Order!</h1>
      <p>Your order has been placed successfully.</p>
      
      {orderId && <p className="order-id-display">Your Order ID is: <strong>{orderId}</strong></p>}
      
      <Link to="/" className="btn-home">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYouPage;