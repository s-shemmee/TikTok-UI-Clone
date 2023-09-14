import React, { useState, useEffect, useRef } from 'react';
import './ShoppingTag.css';
import { Group } from './Group';

const ShoppingTag = ({ id, itemName, x = 0, y = 0, onTagClick, isActive, setShowItemDetails }) => {
  const [isClicked, setIsClicked] = useState(false); // Define isClicked state and its setter
  const buttonRef = useRef(null);
  const groupRef = useRef(null);

  const tagStyle = {
    left: `${x}px`,
    top: `${y}px`,
  };

  const handleButtonClick = () => {
    setIsClicked(!isClicked);
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      (buttonRef.current &&
      !buttonRef.current.contains(event.target)) &&
      (groupRef.current &&
      !groupRef.current.contains(event.target))
    ) {
      // Clicked outside of the button and Group, reset the state
      setIsClicked(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  const min = 100;
  const max = 1000;
  const price = Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <div className="tag-container" style={tagStyle}>
      <button
        ref={buttonRef}
        style={{
          transform: isClicked ? 'scale(1.4)' : 'scale(1.0)', // Increase size when clicked
          border: isClicked ? '2px solid lightblue' : 'none', // Add a light blue border when clicked
          color: 'gray',
          transition: 'transform 0.3s ease, border 0.3s ease', // Add transitions for smoother effects
        }}
        className="tag-button"
        aria-label="Toggle Tag"
        onClick={() => {
          onTagClick(id); // Your current onClick function
          handleButtonClick(); // Additional onClick function
        }}
      ></button>
      { isClicked && isActive && (
        <Group 
        ref={groupRef}
        setShowItemDetails={setShowItemDetails} 
        itemName={itemName} 
        itemPrice={price} />
      )}
    </div>
  );
};

export default ShoppingTag;
