import React from "react";
import { ShowMoreIcon } from "../ShowMoreIcon";
import { Bubble } from "../Bubble";
import "./style.css";
import vectorImage from "./vector-1.svg";

export const Group = () => {
  return (
    <div className="group">
      <div className="overlap">
        <Bubble className="bubble-instance" overlapGroupClassName="design-component-instance-node" />
        <ShowMoreIcon className="show-more-icon" />
        <img className="vector" alt="Vector" src={vectorImage} />
      </div>
      <div className="commentsWrapper">
      </div>
    </div>
  );
};
