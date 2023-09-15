import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './ImageCard.css';
import ShoppingTag from './ShoppingTag';
import ItemDetails from './ItemDetails/src/components/ItemDetails/ItemDetails.jsx';


const ImageCard = (props) => {
  const { username, description, song, likes, shares, comments, saves, profilePic,storefront_images} = props;
  const videoRef = useRef(null);
  const [displaystorefront , setDisplaystorefront]= useState([])
  const [activeTag, setActiveTag] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const itemDetailsRef = useRef(null);
  const handleTagClick = (tagId) => {
    setActiveTag((prevTag) => (prevTag === tagId ? null : tagId));
  };  
  useEffect(() => {
    // Just set storefront_images as the new state value
    setDisplaystorefront(storefront_images);
  }, [storefront_images]);

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
    <div className="image" style={{ position: 'relative', height: '100%' }}>
      {displaystorefront ? (
        <img
          src={`data:image/png;base64,${displaystorefront.storefront_image_binary}`}
          alt={displaystorefront.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%', // Adjust this to control the image height
            transform: 'scale(2)',
            position: 'absolute', // Position the image within the parent div
            top: 100,
            left: 0,
            scrollSnapAlign : 'start',
          }}
        />
      ) : null}
  
      {props.tags && props.tags.map((tag) => (
        <ShoppingTag
          key={tag.id}
          id={tag.id}
          itemName={tag.text}
          x={tag.x}
          y={tag.y}
          onTagClick={handleTagClick}
          isActive={activeTag === tag.id}
          setShowItemDetails={setShowItemDetails}
          style={{
            position: 'absolute', // Position the shopping tag within the parent div
            top: tag.y, // Adjust top and left to position the tag as needed
            left: tag.x,
          }}
        />
      ))}
      {showItemDetails && <ItemDetails ref={itemDetailsRef} />}

      <div className="bottom-controls" style={{ position: 'absolute', bottom: 100 }}>
        <div className="footer-left" style={{ marginRight: 'auto' }}>
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right" style={{ marginRight: 'auto' , position:'sticky'}}>
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
    </div>
  );
  
};

export default ImageCard;
