import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">🌳</span>
            Groott
          </div>
          <p className="footer__brand-desc">
            Delivering nature's finest fruits, fresh from farm to your doorstep.
            Quality and taste, guaranteed.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="footer__heading">Shop</h4>
          <ul className="footer__links">
            <li><Link to="/shop">All Fruits</Link></li>
            <li><Link to="/shop">Citrus</Link></li>
            <li><Link to="/shop">Tropical</Link></li>
            <li><Link to="/shop">Bestsellers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Company</h4>
          <ul className="footer__links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/about">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Support</h4>
          <ul className="footer__links">
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/order-history">Order History</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Groott. All rights reserved.</p>
        <div className="footer__socials">
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
