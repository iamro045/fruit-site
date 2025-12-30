import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // 1. Import your central api instance
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart(); // Make sure clearCart is imported
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
    state: ''
  });

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.inStock)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // 2. Update the order handler to be async and call the API
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const totalAmount = calculateTotal();
      
      // Call the new backend endpoint to create an order
      const response = await api.post('/orders', {
        cartItems,
        address,
        totalAmount,
      });

      clearCart();

      // The backend now clears the cart. On success, navigate to the Thank You page.
      // We'll pass the new order ID to the thank you page via the URL.
      navigate(`/thank-you?orderId=${response.data.orderId}`);
      
    } catch (error)
    {
      console.error("Failed to place order:", error);
      alert("There was an error placing your order. Please try again.");
    }
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

            <h2>Payment Method</h2>
            <div className="payment-upi-section">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI Logo" className="upi-logo" />
              <p>Your order will be placed as "Cash on Delivery".</p>
            </div>
            
            <button type="submit" className="btn-place-order">
              Place Order
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-total">
            <strong>Total Payable</strong>
            <strong>₹{calculateTotal()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;