import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>Groott 🌳</h3>
            <p>Delivering the freshest fruits right to your doorstep. Quality and taste, guaranteed.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Your Cart</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
              <li><Link to="/order-history">Order History</Link></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Groott. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;