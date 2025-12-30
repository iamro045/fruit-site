import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading your order history...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-container">
        <h1>Order History</h1>
        <p>You haven't placed any orders yet.</p>
        <Link to="/" className="btn-shop-now">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-item-card">
            <div className="order-card-header">
              <div>
                <span className="order-label">ORDER ID</span>
                <span>{order.orderId}</span>
              </div>
              <div>
                <span className="order-label">DATE</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="order-card-body">
              <p>Status: <strong>{order.status}</strong></p>
              <p>Total: <strong>₹{order.totalAmount.toFixed(2)}</strong></p>
            </div>
            <div className="order-card-footer">
              <Link to={`/track-order?orderId=${order.orderId}`} className="btn-track-order">
                Track Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;