import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import './FooterLeft.css';

export default function FooterLeft(props) {
  const { username, description, song } = props;

  return (
    <div className="footer-container">
      <div className="footer-left">
        <div className="text">
          <h3>@{username}</h3>
          <p>{description}</p>
          <div className="ticker">
            <FontAwesomeIcon icon={faMusic} style={{ width: '30px' }} />
            {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
            <marquee direction="left" scrollamount="2">
              <span>{song}</span>
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
}
