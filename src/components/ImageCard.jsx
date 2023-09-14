import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './ImageCard.css';
import ShoppingTag from './ShoppingTag';

const ImageCard = (props) => {
  const { setShowItemDetails,username, description, song, likes, shares, comments, saves, profilePic,storefront_images} = props;
  const videoRef = useRef(null);
  const [displaystorefront , setDisplaystorefront]= useState([])
  const [activeTag, setActiveTag] = useState(null);
  const handleTagClick = (tagId) => {
    setActiveTag((prevTag) => (prevTag === tagId ? null : tagId));
  };  
  useEffect(() => {
    // Just set storefront_images as the new state value
    setDisplaystorefront(storefront_images);
  }, [storefront_images]);



  return (
    <div className="image" style={{ maxHeight: '100%', height: '150%' }}>
      {displaystorefront ? (
        <img
          src={`data:image/png;base64,${displaystorefront.storefront_image_binary}`}
          alt={displaystorefront.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%', // Adjust this to control the image height
            transform: 'scale(1.5)',
          }}
        />
      ) : (
        <p>No image available</p>
      )}
      
      {props.tags && props.tags.map((tag) => (
        <ShoppingTag
          key={tag.id}
          id={tag.id}
          text={tag.text}
          x={tag.x}
          y={tag.y}
          onTagClick={handleTagClick}
          isActive={activeTag === tag.id}
          setShowItemDetails={setShowItemDetails}
        />
      ))}
  
      <div className="bottom-controls" style={{ position: 'sticky', bottom: 0 }}>
        <div className="footer-left" style={{ marginRight: 'auto' }}>
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right" style={{ marginRight: 'auto' }}>
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
    </div>
  );
  
  
  
};

export default ImageCard;
