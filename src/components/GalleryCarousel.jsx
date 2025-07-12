import React, { useEffect, useRef } from 'react';

const GalleryCarousel = ({ images, autoScrollSpeed = 2000 }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += 0.5;
      
      const imageWidth = carousel.scrollWidth / (images.length * 2);
      
      if (scrollPosition >= imageWidth * images.length) {
        scrollPosition = 0;
      }
      
      carousel.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [images.length]);

  const duplicatedImages = [...images, ...images];

  return (
    <div className="gallery-carousel-container">
      <div className="gallery-carousel" ref={carouselRef}>
        {duplicatedImages.map((image, index) => (
          <div key={`${image.src}-${index}`} className="gallery-item">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <style>{`
        .gallery-carousel-container {
          width: 100%;
          max-width: 100vw;
          overflow: hidden;
          margin: 2rem 0;
          position: relative;
          height: 20vw;
        }

        .gallery-carousel {
          display: flex;
          gap: 0.5vw;
          overflow-x: hidden;
          overflow-y: hidden;
          scroll-behavior: auto;
          width: 100%;
          height: 100%;
          padding: 0;
        }

        .gallery-item {
          flex-shrink: 0;
          width: calc(30% - 0.33vw);
          height: 100%;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          .gallery-carousel-container {
            height: 20vw;
            width: 100%;
            max-width: 100vw;
          }
          
          .gallery-carousel {
            gap: 0.5vw;
          }
          
          .gallery-item {
            width: calc(30% - 0.33vw);
          }
        }

        @media (max-width: 480px) {
          .gallery-carousel-container {
            height: 50vw;
            width: 100%;
            max-width: 100vw;
          }
          
          .gallery-carousel {
            gap: 0.5vw;
          }
          
          .gallery-item {
            width: calc(30% - 0.33vw);
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryCarousel;
