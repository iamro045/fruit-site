import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [address, setAddress] = useState({ /* ... no changes ... */ });

  const handleAddressChange = (e) => { /* ... no changes ... */ };

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.inStock)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const totalAmount = calculateTotal();
    
    // You can change these details if you like
    const payeeName = "Groott Fruit Shop";
    const transactionNote = "Payment for your fruit order";

    // This creates the UPI payment link with your ID and the dynamic amount
    const upiUrl = `upi://pay?pa=rohitshinde7922@okaxis&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    // This line will attempt to open the user's default UPI app
    window.location.href = upiUrl;
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <div className="checkout-form">
          <form onSubmit={handlePlaceOrder}>
            <h2>Shipping Address</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleAddressChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleAddressChange} required />
            <input type="text" name="street" placeholder="Street Address" onChange={handleAddressChange} required />
            <div className="form-row">
              <input type="text" name="city" placeholder="City" onChange={handleAddressChange} required />
              <input type="text" name="pincode" placeholder="Pincode" onChange={handleAddressChange} required />
            </div>
            <input type="text" name="state" placeholder="State" onChange={handleAddressChange} required />

            {/* --- REPLACED CREDIT CARD FORM --- */}
            <h2>Payment Method</h2>
            <div className="payment-upi-section">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI Logo" className="upi-logo" />
              <p>You will be redirected to your default UPI app (Google Pay, PhonePe, Paytm, etc.) to complete the payment securely.</p>
            </div>
            
            <button type="submit" className="btn-place-order">
              Pay ₹{calculateTotal()} securely
            </button>
          </form>
        </div>

        <div className="order-summary">
          {/* ... no changes to the order summary ... */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;