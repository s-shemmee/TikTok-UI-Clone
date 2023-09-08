import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';
import ShoppingTag from './ShoppingTag';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  const [activeTag, setActiveTag] = useState(null);

  const handleTagClick = (tagId) => {
    setActiveTag((prevTag) => (prevTag === tagId ? null : tagId));
  };

  return (
    <div className="video">
      {/* The video element */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        muted  // Add this line
        src={url}
      ></video>
      {props.tags && props.tags.map(tag => (
        <ShoppingTag
          key={tag.id}
          id={tag.id}
          text={tag.text}
          x={tag.x}
          y={tag.y}
          onTagClick={handleTagClick}
          isActive={activeTag === tag.id}
        />
      ))}
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

export default VideoCard;
