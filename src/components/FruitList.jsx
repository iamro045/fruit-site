import React from 'react';
import FruitCard from './FruitCard';
import './FruitList.css';

const FruitList = ({ fruits }) => { // 1. Accept 'fruits' as a prop
  
  // 2. Add a check for when no fruits are found
  if (fruits.length === 0) {
    return <p className="no-fruits-found">No fruits found matching your search!</p>;
  }

  return (
    <div className="fruit-list">
      {fruits.map(fruit => (
        <FruitCard key={fruit.id} fruit={fruit} />
      ))}
    </div>
  );
};

export default FruitList;