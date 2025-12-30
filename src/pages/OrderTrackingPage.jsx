import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaClipboardCheck, FaBoxOpen, FaTruck, FaHome, FaTimesCircle } from 'react-icons/fa';
import api from '../api';
import './OrderTrackingPage.css';

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const trackOrderById = async (idToTrack) => {
    setTrackedOrder(null);
    setError('');
    if (!idToTrack) {
      setError("Please enter an Order ID.");
      return;
    }
    try {
      const response = await api.get(`/orders/${idToTrack.trim()}`);
      setTrackedOrder(response.data);
    } catch (err) {
      setError('Order not found or you are not authorized to view it.');
      console.error("Failed to track order:", err);
    }
  };
  
  useEffect(() => {
    const orderIdFromUrl = searchParams.get('orderId');
    if (orderIdFromUrl) {
      setOrderId(orderIdFromUrl);
      trackOrderById(orderIdFromUrl);
    }
  }, [searchParams]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    trackOrderById(orderId);
  };
  
  const handleCancelOrder = async () => {
    if (!trackedOrder || !window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }
    try {
      const response = await api.put(`/orders/${trackedOrder.orderId}/cancel`);
      setTrackedOrder(response.data);
      alert('Order cancelled successfully.');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to cancel order.');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Order Confirmed': return <FaClipboardCheck />;
      case 'Shipped': return <FaBoxOpen />;
      case 'Out for Delivery': return <FaTruck />;
      case 'Delivered': return <FaHome />;
      case 'Cancelled': return <FaTimesCircle />;
      default: return null;
    }
  };
  const allStatuses = ['Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

  return (
    <div className="order-tracking-container">
      <h1>Track Your Order</h1>
      <p className="tracking-subtitle">Enter your order ID below to see its status, or click from your Order History.</p>

      <form className="tracking-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button type="submit">Track</button>
      </form>

      {error && <p className="tracking-error">{error}</p>}

      {/* --- THIS IS THE MISSING JSX --- */}
      {trackedOrder && (
        <div className="tracking-results">
          <div className="order-details-header">
            <div>
              <h2>Order #{trackedOrder.orderId}</h2>
              <p>Status: <strong className={`status-${trackedOrder.status.replace(/\s+/g, '-')}`}>{trackedOrder.status}</strong></p>
            </div>
            {trackedOrder.status === 'Order Confirmed' && 
              <button onClick={handleCancelOrder} className="btn-cancel-order">Cancel Order</button>
            }
          </div>
          {trackedOrder.estimatedDelivery && (
             <p className="estimated-delivery">
              Estimated Delivery: <strong>{new Date(trackedOrder.estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
            </p>
          )}

          <div className="order-items-summary">
            <h3>Items in this Order</h3>
            {trackedOrder.items.map(item => (
              <div key={item.productId} className="order-summary-item">
                <span>{item.name} (x{item.quantity})</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="tracking-timeline">
            {trackedOrder.trackingHistory.map((update, index) => {
              const completed = true; // All historical steps are completed
              return (
                <div key={index} className={`timeline-step ${completed ? 'completed' : ''}`}>
                  <div className="timeline-icon">{getStatusIcon(update.status)}</div>
                  <div className="timeline-details">
                    <strong>{update.status}</strong>
                    <span>{new Date(update.date).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;