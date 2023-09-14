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
import ImageCard from'./components/ImageCard';

// This array holds information about different videos
const Image_details = [
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
  function getRandomIndex() {
    return Math.floor(Math.random() * 9) + 1;
  }
  
  
  function get_storefront_images() {
    // An array of storefront IDs you want to fetch
    const storefrontIds = [1, 2, 3,4,5,6,7,8,9];
    // Generate random indexes
    // const storefrontIds = [];
    // while (storefrontIds.length < 5) {
    //   const randomIndex = getRandomIndex();
    //   if (!storefrontIds.includes(randomIndex)) {
    //     storefrontIds.push(randomIndex);
    //   }
    // }
    
    // An array to store the promises for each request
    const requests = storefrontIds.map(storefrontId => {
      return axios.get(`https://backend-tik-fejzxr14d-trollorder.vercel.app/get-user-storefront-image?user_id=1&storefront_id=${storefrontId}`)
        .then(function (response) {
          // Access the storefront image from the response
          return response.data.storefront_image;
        })
        .catch(function (error) {
          console.error('Error:', error);
          return null;
        });
    });
  
    Promise.all(requests)
      .then(images => {
        const validImages = images.filter(image => image !== null);
  
        if (validImages.length === storefrontIds.length) {
          setStorefrontImages(validImages);
        }
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

        {storefrontImages.length > 0 && ( 
          <ImageCard
            setShowItemDetails={setShowItemDetails}
            {...Image_details[0]}
            storefront_images={storefrontImages}

          />
        )}

        <BottomNavbar className="bottom-navbar" />
        {/* <ImageWithPopup imagePath={"public\TikTok User 2.png"} achievement_id={14}></ImageWithPopup> */}
      </div>
    </div>
  );
}

export default App;
