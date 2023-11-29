import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import '../../Components/NextPhotos/nextPhotos.scss';

function NextPhotos({ artists }) {
  return (
    <section className='photos'>
      <h2 className='photos__header'>Next Artists</h2>
      <article className='photos__container'>
        {artists.map((artist) => (
          <Link to={`/gallery/${artist.id}`} key={artist.id} className='photos__item'>
            <motion.div
              whileHover={{ scale: 1.1 }} // Framer Motion hover effect
              className='photos__item__thumbnail-container'
            >
              <img className='photos__item__thumbnail' src={artist.profileImage} alt={artist.name} />
            </motion.div>
            <div className='photos__item__text-container'>
              <h3 className='photos__item__title'>{artist.name}</h3>
              <p className='photos__item__style'>{artist.artStyle}</p>
              <p className='photos__item__zip'>{artist.zip}</p>
            </div>
          </Link>
        ))}
      </article>
    </section>
  );
}

export default NextPhotos;
