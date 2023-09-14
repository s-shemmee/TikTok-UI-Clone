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
    <div className="image" style={{maxHeight: '100%', overflow: 'auto' }}>
      <div>
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
      </div>
      {displaystorefront.length > 0 ? (
        <div style={{maxHeight: '100%', overflow: 'auto' }}> 
          {displaystorefront.map((image, index) => (
            <div key={index} style={{ display: 'inline-block' }}>
              <h2>{image.name}</h2>
              <p>{image.description}</p>
              <p>{image.style}</p>
              {image.storefront_image_binary ? (
                <img src={`data:image/png;base64,${image.storefront_image_binary}`} alt={image.name}  style={{ maxWidth: '100%', maxHeight: '200%',
                transform: 'scale(1.5)', }}/>
              ) : (
                <p>No image available</p>
              )}
              {console.log('image is ',image)} {/* Add this line to log the image */}
            </div>
          ))}
        </div>
      ) : (
        <p>No storefront images available</p>
      )}

      <div className="bottom-controls">
        <div className="footer-left">
          {/* The left part of the container */}
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          {/* The right part of the container */}
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
