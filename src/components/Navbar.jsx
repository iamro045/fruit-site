import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

// 1. Receive searchTerm and setSearchTerm as props
const Navbar = ({ searchTerm, setSearchTerm }) => { 
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Groott 🌳</Link>
      
      <div className="search-container">
        {/* 2. Make the input a controlled component */}
        <input 
          type="text" 
          placeholder="Search for fruits..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Link to="/cart" className="nav-cart-link">
        <FaShoppingCart />
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </Link>
    </nav>
  );
};

export default Navbar;