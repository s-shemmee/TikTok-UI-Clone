import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProfileImagePage from './components/ProfileImagePage/ProfileImagePage';
import ItemDetails from './components/ItemDetails/src/components/ItemDetails/ItemDetails.jsx';
import axios from 'axios';
import ImageWithPopup from './components/achievementicon';


// This array holds information about different videos
const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/41565/square_thumb%402x.jpg',
    username: 'Office Wear For You',
    description: 'All the best office apparel, just for you to peruse. Swipe up for more.',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
    tags: [
      { id: 'product1', text: 'Product 1', x: 110, y: 340 },
      { id: 'product2', text: 'Product 2', x: 220, y: 330 },
      // ... more tags
    ]
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://images.meesho.com/images/products/164261522/yhfct_256.webp',
    username: 'Women’s Accessories For You',
    description: 'Slay your way with these women accessories, handpicked just for you. Swipe up for more.',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'product1', text: 'Product 1', x: 300, y: 100 },
      { id: 'product2', text: 'Product 2', x: 100, y: 200 },
      // ... more tags
    ]
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const itemDetailsRef = useRef(null);
  const [storefrontImages, setStorefrontImages] = useState([]);
  function get_storefront_images () {
    axios.get('http://localhost:5000/get-user-storefront-images?user_id=1')
      .then(function (response) {
        // Access the storefront images from the response
        const images = response.data.storefront_images;
        setStorefrontImages(images);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    get_storefront_images()
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
      
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const location = useLocation();
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (showItemDetails && itemDetailsRef.current && !itemDetailsRef.current.contains(event.target)) {
            setShowItemDetails(false);
        }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, [showItemDetails]);

  return (
    <div className="app">
      <div className="container">
      {showItemDetails && <ItemDetails ref={itemDetailsRef} />}
        {location.pathname !== "/profile-image" && <TopNavbar className="top-navbar" />}
        <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
            {storefrontImages.length > 0 ? (
              <div>
                {storefrontImages.map((image, index) => (
                  <div key={index} style={{ display: 'inline-block'}}>
                    <h2>{image.name}</h2>
                    <p>{image.description}</p>
                    <p>{image.style}</p>
                    <img src={`data:image/png;base64,${image.storefront_image_binary}`} alt={image.name} />
                  </div>
                ))}
              </div>
            ) : (
              <p>No storefront images found.</p>
            )}
          </div>
        <BottomNavbar className="bottom-navbar" />
        {/* <ImageWithPopup imagePath={"public\TikTok User 2.png"} achievement_id={14}></ImageWithPopup> */}
      </div>
    </div>
  );
}

export default App;
