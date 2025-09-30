import React, { useState } from 'react'; // 1. Import useState
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FruitDetailPage from './pages/FruitDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // 2. State for the search term

  return (
    <div className="App">
      {/* 3. Pass the state and setter function to the Navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        {/* 4. Pass the search term down to the HomePage */}
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route path="/fruit/:fruitId" element={<FruitDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;