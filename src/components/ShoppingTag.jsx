import React from 'react';
import './ShoppingTag.css';
import { Group } from './Group';


const ShoppingTag = ({ id, text, x = 0, y = 0, onTagClick, isActive }) => {

  const tagStyle = {
    left: `${x}px`,
    top: `${y}px`,
  };

  return (
    <div className="tag-container" style={tagStyle}>
      <button className="tag-button" onClick={() => onTagClick(id)}></button>
      {isActive && <Group />}
    </div>
  );
}

export default ShoppingTag;
