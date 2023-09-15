import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProfileImagePage from './components/ProfileImagePage/ProfileImagePage';
import ItemDetails from './components/ItemDetails/src/components/ItemDetails/ItemDetails.jsx';
import ProfileImagePage2 from './components/ProfileImagePage/ProfileImagePage2';
import axios from 'axios';
import ImageWithPopup from './components/achievementicon';
import ImageCard from './components/ImageCard';

// This array holds information about different videos
const Image_details = [
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://marketplace.canva.com/EAFXS8-cvyQ/1/0/1600w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-2PE9qJLmPac.jpg',
    username: 'Office Essentials Emporium',
    description: 'Boost your productivity with top-notch office products and essentials, curated just for you. Swipe up for a more efficient workspace.',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'product1', text: 'Desk Organizer', x: 300, y: 100 },
      { id: 'product2', text: 'Ergonomic Chair', x: 100, y: 200 },
    ]
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg',
    username: 'Sip & Savor Whiskey Lounge',
    description: 'Indulge in the world of spirits and fine whiskey at our lounge. Discover rare and exquisite flavors. Swipe up to elevate your palate.',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
    { id: 'spirit1', text: 'Single Malt Scotch', x: 300, y: 100 },
    { id: 'spirit2', text: 'Bourbon Whiskey', x: 100, y: 200 },
    ]
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk4MDQzMTI5NzY3NTM1ODA2/short-captions-for-profile-pictures.png',
    username: 'Fashionista Chic',
    description: 'Elevate your style with these trendy fashion products, carefully curated just for you. Swipe up for more.',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'product1', text: 'Stylish Dress', x: 300, y: 100 },
      { id: 'product2', text: 'Designer Handbag', x: 100, y: 200 },
    ]
  } ,
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.jpg?b=1&s=612x612&w=0&k=20&c=7hgSq1L2mpIbpuuw00KELApMpmZfBkZ-RBxn3Qps5zQ=',
    username: 'TechGeek Hub',
    description: 'Stay ahead in the tech game with these cutting-edge tech products, handpicked just for you. Swipe up for more.',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'product1', text: 'Smartphone', x: 300, y: 100 },
      { id: 'product2', text: 'Laptop', x: 100, y: 200 },
    ]
  } ,
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?5315ffb',
    username: 'Sushi Delight',
    description: 'Experience the authentic flavors of Japan at Sushi Delight. Explore our mouthwatering sushi and more. Swipe up for a taste of Japan!',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'dish1', text: 'Sashimi Platter', x: 300, y: 100 },
      { id: 'dish2', text: 'Tempura Udon', x: 100, y: 200 },
    ]
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL043GvIn5-GPyjRDKuihpqAfQBaNXkuUQ6w&usqp=CAU',
    username: 'Sneaker & Jacket Haven',
    description: 'Step up your style game with the latest sneakers and jackets, handpicked just for you. Swipe up for more.',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'product1', text: 'High-Top Sneakers', x: 300, y: 100 },
      { id: 'product2', text: 'Leather Jacket', x: 100, y: 200 },
    ]
  } ,
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg',
    username: 'WorkTech Essentials',
    description: 'Enhance your productivity with the latest personal tech products for work. Stay connected and efficient. Swipe up for the future of work.',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'product1', text: 'Wireless Earbuds', x: 300, y: 100 },
      { id: 'product2', text: 'Portable Monitor', x: 100, y: 200 },
    ]
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://images.meesho.com/images/products/164261522/yhfct_256.webp',
    username: 'Chill & Grill Supermarket',
    description: 'Discover a world of delicious cold supermarket food. From refreshing salads to gourmet sandwiches. Swipe up to chill and satisfy your taste buds.',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'food1', text: 'Mediterranean Salad', x: 300, y: 100 },
      { id: 'food2', text: 'Gourmet Sandwich', x: 100, y: 200 },
    ]
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://www.nigeriagalleria.com/blog/wp-content/uploads/2023/03/Why-do-Anime-Characters-Make-Perfect-Profile-Pictures.png',
    username: 'Denim Dreamland',
    description: 'Dive into the world of denim fashion. Explore the latest trends in jeans, jackets, and more. Swipe up to upgrade your denim game!',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    tags: [
      { id: 'product1', text: 'Slim Fit Jeans', x: 300, y: 100 },
      { id: 'product2', text: 'Denim Jacket', x: 100, y: 200 },
    ]
  }


];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [storefrontImages, setStorefrontImages] = useState([]);
  function getRandomIndex() {
    return Math.floor(Math.random() * 9) + 1;
  }


  function get_storefront_images() {
    // An array of storefront IDs you want to fetch
    const storefrontIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
  const location = useLocation();


  return (
    <div className="app">
      <div className="container">
        {(location.pathname !== "/profile-image" && location.pathname !== "/profile-image/2") && <TopNavbar className="top-navbar" />}
        <Routes>
          <Route path="/" element={
            <>
              {storefrontImages.length > 0 && storefrontImages.map((image, index) => (
                <ImageCard
                  key={index} // Make sure to add a unique key prop when mapping over elements
                  {...Image_details[index]}
                  storefront_images={image} // Create an array with a single image
                />
              ))}
            </>
          } />
          <Route path="/profile-image" element={<ProfileImagePage />} />
          <Route path="/profile-image/2" element={<ProfileImagePage2 />} />
        </Routes>
        <BottomNavbar className="bottom-navbar" />
        {/* <ImageWithPopup imagePath={"public\TikTok User 2.png"} achievement_id={14}></ImageWithPopup> */}
      </div>
    </div>
  );
}

export default App;
