import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext'; // To know if a user is logged in
import api from '../api'; // Our centralized axios instance

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Get the current user from our AuthContext

  // This useEffect runs whenever the user logs in or logs out
  useEffect(() => {
    const loadCart = async () => {
      // If a user is logged in, fetch their cart from the database
      if (user) {
        setLoading(true);
        try {
          const response = await api.get('/cart');
          setCartItems(response.data);
        } catch (error) {
          console.error("Failed to fetch user's cart", error);
        } finally {
          setLoading(false);
        }
      } else {
        // If the user logs out, clear the cart state
        setCartItems([]);
      }
    };

    loadCart();
  }, [user]); // The dependency array ensures this runs when 'user' changes

  // All cart functions are now ASYNC and make API calls if the user is logged in
  
  const addToCart = async (fruit, quantityToAdd = 1) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    const existingItem = cartItems.find(item => item.id === fruit.id);
    const newQuantity = existingItem ? existingItem.quantity + quantityToAdd : quantityToAdd;
    try {
      await api.post('/cart', { productId: fruit.id, quantity: newQuantity });
      const response = await api.get('/cart'); // Refetch cart to get the latest state
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      await api.delete(`/cart/${productId}`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!user) return;
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    try {
      await api.post('/cart', { productId: productId, quantity: newQuantity });
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) updateQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) updateQuantity(productId, item.quantity - 1);
  };
  
  const clearCart = async () => {
    // To fully implement this, you'd need a DELETE /api/cart/all endpoint
    // For now, we'll just remove items one by one on the frontend
    if (!user) return;
    try {
      for (const item of cartItems) {
        await api.delete(`/cart/${item.id}`);
      }
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};