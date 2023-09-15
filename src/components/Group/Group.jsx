import React, { useState } from "react"; // Add useState
import { ShowMoreIcon } from "../ShowMoreIcon";
import { Bubble } from "../Bubble";
import "./style.css";
import vectorImage from "./vector-1.svg";
import { ItemDetails } from "../ItemDetails/src/components/ItemDetails/ItemDetails.jsx"

export const Group = ({ setShowItemDetails,itemName,itemPrice }) => {
  const handleShowMoreClick = (e) => {
      e.stopPropagation();
      setShowItemDetails(true); // Set it to true when clicked
      console.log("Hello World");
  };

  const itemInfo = [itemName,itemPrice];
  return (
    <div className="group">
      <div className="overlap">
        <Bubble className="bubble-instance" overlapGroupClassName="design-component-instance-node" itemInfo={itemInfo} />
        <ShowMoreIcon className="show-more-icon" onClick={handleShowMoreClick} />
        <img className="vector" alt="Vector" src={vectorImage} />
      </div>
      <div className="commentsWrapper">
      </div>
    </div>
  );
};
