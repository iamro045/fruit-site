import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import './Navbar.css';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Groott 🌳</Link>

      <div className="search-container">
        {/* --- FILLED IN: Search Input --- */}
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search for fruits..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-actions">
        {/* --- FILLED IN: Action Links --- */}
        {/* <Link to="/track-order" className="nav-action-link" title="Track Your Order">
            <TbTruckDelivery />
        </Link> */}
        <Link to="/cart" className="nav-action-link" title="Your Cart">
          <FaShoppingCart />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
        
        {/* --- Conditional user info or login icon --- */}
        {user ? (
          <div className="user-menu">
            <span>Hi, {user.name}</span>
            <Link to="/order-history" className="user-menu-link">My Orders</Link>
            <button onClick={logout} className="btn-logout">Logout</button>
          </div>

        
        ) : (
          <Link to="/login" className="nav-action-link" title="Login / Sign Up">
            <FaUserCircle />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;