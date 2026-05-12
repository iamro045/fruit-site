import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaUserCircle, FaSearch, FaSignOutAlt, FaHistory, FaShieldAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const prevCount = useRef(0);
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevCount.current) {
      setCartAnim(true);
      setTimeout(() => setCartAnim(false), 700);
    }
    prevCount.current = totalItems;
  }, [totalItems]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* Logo */}
      <Link to="/" className="nav-logo">
        <span className="nav-logo__icon">🌳</span>
        Groott
      </Link>

      {/* Nav links */}
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>

      {/* Search */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search fruits..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="nav-actions">
        <Link to="/cart" className="nav-action-btn" title="Your Cart">
          <FaShoppingCart />
          {totalItems > 0 && (
            <span className={`cart-badge ${cartAnim ? 'cart-badge--bounce' : ''}`}>
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="user-menu-wrapper">
            <button
              className="nav-action-btn user-trigger"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              title={user.name}
            >
              <FaUserCircle />
            </button>
            {userMenuOpen && (
              <div className="user-dropdown" onClick={() => setUserMenuOpen(false)}>
                <div className="user-dropdown__name">Hi, {user.name} 👋</div>
                <Link to="/order-history" className="user-dropdown__item">
                  <FaHistory /> Order History
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="user-dropdown__item">
                    <FaShieldAlt /> Admin Panel
                  </Link>
                )}
                <button onClick={logout} className="user-dropdown__item user-dropdown__logout">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-action-btn" title="Login">
            <FaUserCircle />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
