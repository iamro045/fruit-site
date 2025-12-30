import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import FruitDetailPage from './pages/FruitDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* It's good practice to wrap your routes in a <main> tag */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/fruit/:fruitId" element={<FruitDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
        </Routes>
      </main>

      <Footer /> {/* <-- The Footer now lives here */}
    </div>
  );
}

export default App;