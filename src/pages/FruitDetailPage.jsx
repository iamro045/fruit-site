import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import "./FruitDetailPage.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import InfoBar from "../components/InfoBar";
import CustomerReviews from '../components/CustomerReviews';
import AccordionItem from '../components/AccordionItem'; // NEW: Import the AccordionItem component

const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

const FruitDetailPage = () => {
  const { fruitId } = useParams();
  const [fruit, setFruit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  // REMOVED: const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    fetch("/fruits.json")
      .then((res) => res.json())
      .then((fruits) => {
        const selectedFruit = fruits.find((f) => f.id === fruitId);
        setFruit(selectedFruit);
        if (selectedFruit && selectedFruit.images && selectedFruit.images.length > 0) {
          setMainImage(selectedFruit.images[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch fruit details", err);
        setLoading(false);
      });
  }, [fruitId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!fruit) {
    return (
      <div>
        Fruit not found! <Link to="/">Go back home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(fruit, quantity);
    alert(`${quantity} x ${fruit.name} added to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    return <div className="stars">{stars}</div>;
  };

return (
    <div className="fruit-detail-container">
      <Link to="/" className="back-link" title="Back to all fruits">
        <IoArrowBack />
      </Link>

      <div className="product-layout-grid">
        {/* --- LEFT COLUMN: IMAGE --- */}
        <div className="fruit-image-gallery">
          <div className="thumbnail-list">
            {fruit.images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail-item ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              >
                <img src={getImageUrl(img)} alt={`thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="main-image-container">
            {mainImage && (
              <img
                src={getImageUrl(mainImage)}
                alt={fruit.name}
                className="main-image"
              />
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: CORE DETAILS ONLY --- */}
        <div className="fruit-details-column">
          <h1>{fruit.name}</h1>
          <div className="rating-container">
            {renderStars(fruit.rating)}
            <span>
              {fruit.rating} ({fruit.reviews} reviews)
            </span>
          </div>
          <p className="fruit-detail-price">
            ₹{fruit.price} <span>{fruit.unit}</span>
          </p>
          <ul className="product-highlights">
            {fruit.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>

          {fruit.inStock ? (
            <>
              <div className="quantity-selector">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </>
          ) : (
            <button className="out-of-stock-btn" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>

      {/* --- SECTIONS BELOW THE GRID --- */}
      <InfoBar />

      <div className="product-accordion">
        <AccordionItem title="About the Product" isOpenByDefault={true}>
          <p>{fruit.description}</p>
        </AccordionItem>
        <AccordionItem title="Nutritional Info">
          <ul className="nutrition-list">
            <li><strong>Calories:</strong> {fruit.nutrition.calories}</li>
            <li><strong>Carbs:</strong> {fruit.nutrition.carbs}</li>
            <li><strong>Fiber:</strong> {fruit.nutrition.fiber}</li>
            <li><strong>Protein:</strong> {fruit.nutrition.protein || 'N/A'}</li>
          </ul>
        </AccordionItem>
        <AccordionItem title={`Rating and Reviews (${fruit.reviews})`}>
          <CustomerReviews reviews={fruit.customerReviews} />
        </AccordionItem>
      </div>

    </div>
  );
};

export default FruitDetailPage;