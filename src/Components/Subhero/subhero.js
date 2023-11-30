// SubHero.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


const SubHero = ({ imagesListRef }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await axios.get('http://localhost:1234/api/photos');
        const reversedImages = response.data.reverse();
        setImageUrls(response.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    fetchImageUrls();
  }, [imagesListRef]); // Use imagesListRef in the dependency array

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='sub-hero-container'>
      {imageUrls.length > 0 && (
        <div className='image-container'>
          {imageUrls.map((url, index) => (
            <motion.img
              key={index}
              src={url}
              alt={`Image ${index + 1}`}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleImageClick(index)}
              style={{ width: '5rem', height: 'auto', maxWidth: '10rem', borderRadius:'20%', margin:'2rem' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubHero;
