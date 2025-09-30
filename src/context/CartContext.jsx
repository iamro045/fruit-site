import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error parsing cart data from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    const syncCartWithData = async () => {
      try {
        const response = await fetch('/fruits.json');
        const freshData = await response.json();
        
        // --- FIX: Added a try...catch for safety ---
        let storedCart = [];
        try {
          storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        } catch (error) {
          console.error("Could not parse stored cart, starting fresh.", error);
        }

        const syncedCart = storedCart.map(cartItem => {
          const freshItemData = freshData.find(fruit => fruit.id === cartItem.id);
          if (freshItemData) {
            return {
              ...freshItemData,
              quantity: cartItem.quantity,
            };
          }
          return null;
        }).filter(Boolean);

        setCartItems(syncedCart);
      } catch (error) {
        console.error("Failed to sync cart:", error);
      }
    };

    syncCartWithData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ... (addToCart, removeFromCart, and other functions remain the same) ...

  const addToCart = (fruit, quantityToAdd = 1) => {
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === fruit.id);
      if (isItemInCart) {
        return prevItems.map(item =>
          item.id === fruit.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      } else {
        return [...prevItems, { ...fruit, quantity: quantityToAdd }];
      }
    });
  };
  
  const removeFromCart = (fruitId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== fruitId));
  };

  const increaseQuantity = (fruitId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === fruitId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (fruitId) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === fruitId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};