/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const ShowMoreIcon = ({ className, onClick }) => {
  return (
    <div onClick={onClick}>
    <svg
      className={`show-more-icon ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        clipRule="evenodd"
        d="M13.5059 10.5888L7.55053 16.5442C7.38782 16.7069 7.12399 16.7069 6.96128 16.5442L6.37203 15.955C6.20932 15.7923 6.20932 15.5284 6.37203 15.3657L11.7382 9.99959L6.37203 4.63347C6.20932 4.47076 6.20932 4.20693 6.37203 4.04422L6.96128 3.45497C7.12399 3.29226 7.38782 3.29226 7.55053 3.45497L13.5059 9.41034C13.8314 9.73576 13.8314 10.2634 13.5059 10.5888Z"
        fill="#455154"
        fillRule="evenodd"
      />
    </svg>
    </div>
  );
};
