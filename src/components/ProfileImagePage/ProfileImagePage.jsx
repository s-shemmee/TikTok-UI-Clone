import React from 'react';
import './ProfileImagePage.css';  // Import the CSS file
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css/scrollbar';

function ProfileImagePage() {
  const images = [
    {
      url: "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=9",
      captions: ["Oktoberfest", "Achieved!"]
    },
    {
      url: "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=10",
      captions: ["Teachers’ Day Sale", "Achieved!"]
    },
    {
      url: "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=10",
      captions: ["Teachers’ Day Sale", "Achieved!"]
    },
    {
      url: "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=10",
      captions: ["Teachers’ Day Sale", "Achieved!"]
    },
    {
      url: "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=10",
      captions: ["Teachers’ Day Sale", "Achieved!"]
    },
    // ... add more images with captions
  ];


  return (
    <div className="profile-image-page">
      <img src="/TikTok User.png" alt="Profile" className="full-profile-image" />
      <div className="red-box">
        <Swiper
          className="swiper-container-style"
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          modules={[Scrollbar]}  // Add this line to use the Scrollbar module
          scrollbar={{ draggable: true }}  // Enable the scrollbar with draggable functionality
        >          {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.url} alt={`Image ${index}`} style={{ width: '100%' }} />
            <div style={{ width: 114, height: 29, position: 'relative' }}>
              <div style={{ width: 114, height: 12, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#151923', fontSize: 12.39, fontFamily: 'Roboto', fontWeight: '600', wordWrap: 'break-word' }}>
                {image.captions[0]}
              </div>
              <div style={{ left: 35, top: 17, position: 'absolute', textAlign: 'center', color: '#FA2D6C', fontSize: 10, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word' }}>
                {image.captions[1]}
              </div>
            </div>
          </SwiperSlide>
        ))}

        </Swiper>
      </div>
      <Link to="/" className="clickable-box"></Link>
    </div>
  );
}

export default ProfileImagePage;
