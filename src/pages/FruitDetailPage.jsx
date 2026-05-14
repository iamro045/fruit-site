import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FRUITS_STATIC, getImageUrl } from '../data/fruits';
import './FruitDetailPage.css';

const FruitDetailPage = ({ showToast }) => {
  const { fruitId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [fruit, setFruit] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/fruits`)
      .then(res => {
        const found = res.data.find(f => f.id === fruitId);
        setFruit(found || null);
      })
      .catch(() => {
        setFruit(FRUITS_STATIC.find(f => f.id === fruitId) || null);
      });
  }, [fruitId]);

  const handleAdd = async () => {
    for (let i = 0; i < qty; i++) await addToCart(fruit);
    if (showToast) showToast(`${fruit.name} added to cart`);
  };

  if (!fruit) return (
    <div className="detail-loading">
      <span className="detail-loading__spinner" />
      <p>Loading…</p>
    </div>
  );

  const mainImage = fruit.images?.[0] || '';

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-layout">
        {/* Image column */}
        <div className="detail-image-col">
          <div className="detail-image-wrap" style={{ background: `linear-gradient(135deg, ${fruit.color || '#2d5a27'}22, transparent)` }}>
            {mainImage ? (
              <img src={getImageUrl(mainImage)} alt={fruit.name} className="detail-image" />
            ) : (
              <span className="detail-emoji">{fruit.emoji || '🍑'}</span>
            )}
          </div>
          {/* Thumbnails placeholder */}
          {fruit.images && fruit.images.length > 1 && (
            <div className="detail-thumbs">
              {fruit.images.map((img, i) => (
                <img key={i} src={getImageUrl(img)} alt="" className="detail-thumb" />
              ))}
            </div>
          )}
        </div>

        {/* Info column */}
        <div className="detail-info">
          <span className="detail-category">{fruit.category}</span>
          {!fruit.inStock && <span className="detail-oos-badge">Out of Stock</span>}

          <h1 className="detail-name">{fruit.name}</h1>

          {/* Rating */}
          <div className="detail-rating">
            <div className="detail-stars">
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ color: s <= Math.round(fruit.rating) ? '#f1c40f' : 'var(--text-muted)' }}>★</span>
              ))}
            </div>
            <span className="detail-rating-text">{fruit.rating} · {fruit.reviews} reviews</span>
          </div>

          {/* Price */}
          <div className="detail-price">
            <span className="detail-price-value">₹{fruit.price}</span>
            <span className="detail-price-unit">{fruit.unit}</span>
          </div>

          {/* Highlights */}
          <div className="detail-highlights">
            {(fruit.highlights || []).map(h => (
              <span key={h} className="detail-highlight">✓ {h}</span>
            ))}
          </div>

          {/* Tabs */}
          <div className="detail-tabs">
            {['desc', 'nutrition'].map(t => (
              <button key={t} className={`detail-tab ${tab === t ? 'detail-tab--active' : ''}`} onClick={() => setTab(t)}>
                {t === 'desc' ? 'Description' : 'Nutrition'}
              </button>
            ))}
          </div>

          <div className="detail-tab-content">
            {tab === 'desc' && (
              <p className="detail-desc">{fruit.description}</p>
            )}
            {tab === 'nutrition' && (
              <div className="detail-nutrition">
                {Object.entries(fruit.nutrition || {}).map(([k, v]) => (
                  <div key={k} className="detail-nutrition-row">
                    <span>{k}</span><span>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add to cart */}
          {fruit.inStock && (
            <div className="detail-cart-row">
              <div className="detail-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="detail-add-btn" onClick={handleAdd}>
                Add {qty > 1 ? `${qty} ×` : ''} to Cart
              </button>
            </div>
          )}
          {!fruit.inStock && (
            <div className="detail-oos-msg">Currently out of stock — check back soon!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FruitDetailPage;
