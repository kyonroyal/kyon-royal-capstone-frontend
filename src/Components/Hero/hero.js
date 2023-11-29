import React from 'react';
import { motion } from 'framer-motion';
import '../../Components/Hero/hero.scss';

function Hero({ currentArtist }) {
  return (
    <motion.section className='hero' whileHover={{ scale: 1.1 }}>
      <motion.img
        className='hero__artist'
        src={currentArtist.profileImage}
        alt={currentArtist.name}
        controls
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.section>
  );
}

export default Hero;
