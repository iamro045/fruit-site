import React, { useState } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import './AccordionItem.css';

const AccordionItem = ({ title, children, isOpenByDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <div className="accordion-icon">
          {isOpen ? <IoRemove /> : <IoAdd />}
        </div>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;