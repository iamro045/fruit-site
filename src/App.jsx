import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import FruitDetailPage from './pages/FruitDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  };

  return (
    <div className="App">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} showToast={showToast} />
      <main className="main-content">
        <Routes>
          <Route path="/"               element={<HomePage searchTerm={searchTerm} showToast={showToast} />} />
          <Route path="/shop"           element={<ShopPage searchTerm={searchTerm} showToast={showToast} />} />
          <Route path="/fruit/:fruitId" element={<FruitDetailPage showToast={showToast} />} />
          <Route path="/cart"           element={<CartPage />} />
          <Route path="/checkout"       element={<CheckoutPage />} />
          <Route path="/thank-you"      element={<ThankYouPage />} />
          <Route path="/track-order"    element={<OrderTrackingPage />} />
          <Route path="/order-history"  element={<OrderHistoryPage />} />
          <Route path="/login"          element={<LoginPage />} />
          <Route path="/signup"         element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin"          element={<AdminPage />} />
          <Route path="/about"          element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
      <Toast message={toast} />
    </div>
  );
}

export default App;
