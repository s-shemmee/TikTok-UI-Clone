/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import "./style.css";
import img1674 from './img-1674-1.png';
import React, { forwardRef } from 'react';

const ItemDetails = forwardRef(({ name = "Jacket with Button Placket", price2 = "$3,700" }, ref) => {
  return (
    <div className="item-details" ref={ref}>
      <div className="overlap-group">
        <div className="overlap">
          <img className="close-icon" alt="Close icon" src="/img/close-icon.svg" />
        </div>
        <div className="element-wrapper">
          <div className="element">{price2}</div>
        </div>
        <div className="div">
          <div className="jacket-with-button">{name}</div>
          <img className="IMG" alt="Img" src={img1674} />
        </div>
      </div>
    </div>
  );
});

ItemDetails.propTypes = {
  name: PropTypes.string,
  price2: PropTypes.string,
};

export default ItemDetails;

