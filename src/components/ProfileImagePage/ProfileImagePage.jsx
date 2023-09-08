// ProfileImagePage.js

import React from 'react';
import './ProfileImagePage.css';  // Import the CSS file
import { Link } from 'react-router-dom';

function ProfileImagePage() {
  return (
    <div className="profile-image-page">
      <img src="/TikTok User.png" alt="Profile" className="full-profile-image" />
      <Link to="/" className="clickable-box"></Link>
    </div>
  );
}

export default ProfileImagePage;
