import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.inStock)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const isCheckoutDisabled =
    cartItems.some((item) => !item.inStock) || cartItems.length === 0;

  // --- UPDATED: Empty cart view ---
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty!</h2>
        <Link to="/" className="btn-continue-shopping primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => {
          const mainImage =
            item.images && item.images.length > 0 ? item.images[0] : "";
          return (
            <div
              key={item.id}
              className={`cart-item ${!item.inStock ? "unavailable" : ""}`}
            >
              <img
                src={getImageUrl(mainImage)}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                {!item.inStock && (
                  <p className="unavailable-text">Currently Unavailable</p>
                )}
                <p>Price: ₹{item.price}</p>
                <div className="cart-quantity-control">
                  <span>Quantity:</span>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={!item.inStock}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    disabled={!item.inStock}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-actions">
                <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- UPDATED: Cart summary section --- */}
      <div className="cart-summary">
        <Link to="/" className="btn-continue-shopping">
          ← Continue Shopping
        </Link>
        <div className="checkout-section">
          <h2>Total Payable: ₹{calculateTotal()}</h2>
          {isCheckoutDisabled && cartItems.length > 0 && (
            <p className="checkout-error">
              Please remove unavailable items to proceed.
            </p>
          )}
          <Link to="/checkout" className="btn-checkout">
            <button className="btn-checkout" disabled={isCheckoutDisabled}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
