import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const getImageUrl = (name) => {
  return `http://localhost:5001/assets/${name}`;
};

const AdminPage = () => {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/fruits');
        setFruits(response.data);
      } catch (error) {
        console.error("Failed to fetch fruits:", error);
      }
    };
    fetchFruits();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Products</h1>
        <button className="btn-add-new">Add New Fruit</button>
      </div>
      
      <div className="product-list">
        {fruits.map(fruit => (
          <div key={fruit.id} className="product-list-item">
            <img src={getImageUrl(fruit.images[0])} alt={fruit.name} className="product-item-image" />
            <span className="product-item-name">{fruit.name}</span>
            <div className="product-item-actions">
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;