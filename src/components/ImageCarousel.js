import React, { useEffect, useRef, useState } from 'react';

function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (imageRef.current) {
        imageRef.current.classList.remove('image-fade-in');
      }
    };

    if (imageRef.current) {
      imageRef.current.addEventListener('animationend', handleAnimationEnd);
      imageRef.current.classList.add('image-fade-in');
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [currentImageIndex]);

  useEffect(() => {
    if (prevImageIndex !== null) {
      const prevImage = document.querySelector(`.image[data-index='${prevImageIndex}']`);
      if (prevImage) {
        prevImage.classList.add('image-fade-out');
      }
    }
  }, [prevImageIndex]);

  return (
    <div className="relative w-64 h-64 overflow-hidden rounded-lg shadow image-container bg-darkest-blue">
      {images.map((src, index) => (
        <img
          key={src}
          ref={index === currentImageIndex ? imageRef : null}
          src={src}
          className={`image ${index === prevImageIndex ? 'image-fade-out' : ''}`}
          alt={`Character ${index}`}
          data-index={index}
          style={{ opacity: index === currentImageIndex || index === prevImageIndex ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

export default ImageCarousel;