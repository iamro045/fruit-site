import React from 'react';
// Using modern, clean icons from the Tabler Icons set
import { TbTruckDelivery, TbClockHour4, TbReplace, TbRosette } from 'react-icons/tb';
import './InfoBar.css';

const InfoBar = () => {
  return (
    <div className="info-bar">
      <div className="info-item">
        <TbRosette className="info-icon" />
        <div className="info-text">
          <strong>Quality Assured</strong>
          <span>Freshness Guaranteed</span>
        </div>
      </div>
      <div className="info-item">
        <TbTruckDelivery className="info-icon" />
        <div className="info-text">
          <strong>Free Delivery</strong>
          <span>On orders over ₹500</span>
        </div>
      </div>
      <div className="info-item">
        <TbClockHour4 className="info-icon" />
        <div className="info-text">
          <strong>Arrives in</strong>
          <span>1-2 Business Days</span>
        </div>
      </div>
      <div className="info-item">
        <TbReplace className="info-icon" />
        <div className="info-text">
          <strong>Easy Returns</strong>
          <span>3-Day Return Policy</span>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;