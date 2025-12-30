import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const getImageUrl = (name) => {
  // Points to your backend's public/assets folder
  return `http://localhost:5001/assets/${name}`;
};

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems
    .filter(item => item.inStock)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FRUIT10') {
      const discountAmount = subtotal * 0.10;
      setDiscount(discountAmount);
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code.');
      setDiscount(0);
    }
  };

  const finalTotal = (subtotal - discount).toFixed(2);
  const isCheckoutDisabled = cartItems.some(item => !item.inStock) || cartItems.length === 0;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty!</h2>
        <Link to="/" className="btn-continue-shopping primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-layout">
        
        {/* --- LEFT (MAIN) COLUMN --- */}
        <div className="cart-items-list">
          {cartItems.map(item => {
            const mainImage = item.images && item.images.length > 0 ? item.images[0] : '';
            return (
              <div key={item.id} className={`cart-item ${!item.inStock ? 'unavailable' : ''}`}>
                <img src={getImageUrl(mainImage)} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  {!item.inStock && <p className="unavailable-text">Currently Unavailable</p>}
                  <p>Price: ₹{item.price}</p>
                  <div className="cart-quantity-control">
                    <button onClick={() => decreaseQuantity(item.id)} disabled={!item.inStock}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} disabled={!item.inStock}>+</button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="btn-remove">Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- RIGHT (SIDEBAR) COLUMN --- */}
        <div className="order-summary-sidebar">
          <h2>Order Summary</h2>
          <div className="total-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="coupon-section">
            <input 
              type="text" 
              placeholder="Coupon Code"
              className="coupon-input"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn-apply-coupon" onClick={handleApplyCoupon}>Apply</button>
          </div>

          {discount > 0 && (
            <div className="total-row discount">
              <span>Discount (FRUIT10)</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>
          )}
          <hr />
          <div className="total-row grand-total">
            <strong>Total Payable</strong>
            <strong>₹{finalTotal}</strong>
          </div>
          
          {isCheckoutDisabled && cartItems.length > 0 && 
              <p className='checkout-error'>Please remove unavailable items to proceed.</p>}
          
          <Link to="/checkout" className="btn-checkout-link">
            <button className="btn-checkout" disabled={isCheckoutDisabled}>
              Proceed to Checkout
            </button>
          </Link>
          <Link to="/" className="btn-continue-shopping">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;