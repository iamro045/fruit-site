import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../api';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        setLoading(true);
        try {
          const response = await api.get('/cart');
          setCartItems(response.data);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCartItems([]);
      }
    };
    loadCart();
  }, [user]);

  const addToCart = async (fruit, quantityToAdd = 1) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    const existing = cartItems.find(i => i.id === fruit.id);
    const newQty = existing ? existing.quantity + quantityToAdd : quantityToAdd;
    try {
      await api.post('/cart', { productId: fruit.id, quantity: newQty });
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      await api.delete(`/cart/${productId}`);
      setCartItems(prev => prev.filter(i => i.id !== productId));
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!user) return;
    if (newQuantity === 0) { removeFromCart(productId); return; }
    try {
      await api.post('/cart', { productId, quantity: newQuantity });
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (item) updateQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (item) updateQuantity(productId, item.quantity - 1);
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      for (const item of cartItems) await api.delete(`/cart/${item.id}`);
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems, loading, addToCart, removeFromCart,
      increaseQuantity, decreaseQuantity, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
