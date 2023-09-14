import React, { useState } from 'react';
import './ShoppingTag.css';
import { Group } from './Group';


const ShoppingTag = ({ id, text, x = 0, y = 0, onTagClick, isActive, setShowItemDetails }) => {
  const [isClicked, setIsClicked] = useState(false); // Define isClicked state and its setter

  const tagStyle = {
    left: `${x}px`,
    top: `${y}px`,
  };
  const handleButtonClick = () => {
    // You can add logic here to increase the size and add the border
    // For example, if you're using state to manage the clicked state:
    setIsClicked(!isClicked);
  };
  return (
    <div className="tag-container" style={tagStyle}>
      <button 
      style={{
        transform: isClicked ? 'scale(1.4)' : 'scale(1.0)', // Increase size when clicked
        border: isClicked ? '2px solid lightblue' : 'none', // Add a light blue border when clicked
        color: 'gray',
        transition: 'transform 0.3s ease, border 0.3s ease', // Add transitions for smoother effects
      }}
      className="tag-button" aria-label="Toggle Tag"  onClick={() => {
    onTagClick(id); // Your current onClick function
    handleButtonClick(); // Additional onClick function
  }}
  ></button>
      {isActive && <Group setShowItemDetails={setShowItemDetails} />}
    </div>
  );
}

export default ShoppingTag;
