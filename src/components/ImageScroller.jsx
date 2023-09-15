import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css';

const ImageScroller = () => {
    const params = {
        slidesPerView: 3,
        spaceBetween: 10,
        freeMode: true
    };

    const images = [
        "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=9",
        "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=10",
        "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=11",
        "https://backend-tik-fcdzdwm1n-trollorder.vercel.app/get-achievement-image?achievement_id=12"
    ];

    return (
        <Swiper {...params}>
            {images.map((img, index) => (
                <div key={index}>
                    <img src={img} alt={`Image ${index}`} style={{ width: '100%' }} />
                </div>
            ))}
        </Swiper>
    );
}

export default ImageScroller;
