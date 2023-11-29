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
        setImageUrls(response.data);
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubHero;
