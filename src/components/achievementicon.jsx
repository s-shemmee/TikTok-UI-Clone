import React, { useState, useEffect } from 'react';
import axios from 'axios';

const popupStyle = {
    position: 'relative',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    width: '300px', 
  };

function ImageWithPopup({ imagePath,  achievement_id}) {
    const [showPopup, setShowPopup] = useState(false);
    const [imageBase64, setImageBase64] = useState('');
    const [description, setDescription] = useState('');
    const [achievementName, setAchievementName] = useState('');
  
    useEffect(() => {
      // Fetch the base64 image and additional data using Axios when the component mounts
      axios.get('http://localhost:5000/view-achievement-image', {
        params: { achievement_id: achievement_id },
      })
        .then(function (response) {
          const { achievements } = response.data;
          setImageBase64(achievements);
  
          // Access and set the achievement name and description
          setAchievementName(response.data.name);
          setDescription(response.data.description);
          console.log(response.data.name)
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    }, [achievement_id]); // Include achievement_id in the dependency array to fetch data when it changes
    const togglePopup = () => {
        setShowPopup(!showPopup);
      };

  return (
    <div style={{ position: 'relative' }}>
    {imageBase64 && <img
          src={`data:image/png;base64,${imageBase64}`}
          alt="Achievement"
          style={{ width: '5vw', height: '5vw' }} // Set the width and height to 10% of the viewport width
          onClick={togglePopup}
        />}
    </div>
  );
}
export default ImageWithPopup;
