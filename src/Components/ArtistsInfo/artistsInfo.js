import React, { useState } from 'react';
import axios from 'axios';
import "../ArtistsInfo/artistsInfo.scss";

function ArtistInfo({ artist }) {
  const [editArtist, setEditArtist] = useState({});
  const [dltArtist, setDltArtist] = useState({});

  if (!artist) {
    return null; // Handle case where artist information is not available
  }

  const { name, artStyle, zipCode, profileImage, portfolio } = artist;

  const handleEdit = () => {
    axios
      .put('http://localhost:1234/api/data') // Adjust the endpoint based on your API
      .then(response => setEditArtist(response.data));
  };

  const handleDlt = () => {
    axios
      .delete('http://localhost:1234/api/data') // Adjust the endpoint based on your API
      .then(response => setDltArtist(response.data));
  };

  return (
    <section className='artist-info'>
      <h1 className='artist-info__title'>{name}</h1>
      <article className='artist-info__details'>
        <div className='artist-info__group art-style-zip'>
          <h2 className='artist-info__art-style'>Art Style: {artStyle}</h2>
          <h2 className='artist-info__zip-code'>Zip Code: {zipCode}</h2>
        </div>
        <div className='artist-info__group profile-portfolio'>
          <img
            className='artist-info__profile-image'
            src={process.env.PUBLIC_URL + profileImage}
            alt={`${name}'s profile`}
          />
          <div className='button_ctnr'>
            <button onClick={handleEdit}>
              Edit
            </button>
            <button onClick={handleDlt}>
              Delete
            </button>
          </div>
          {portfolio && portfolio.length > 0 && (
            <div className='artist-info__portfolio'>
              <h3>Portfolio</h3>
              <div className="portfolio-images">
                {portfolio.map((item, index) => (
                  <img
                    key={index}
                    src={item.url}
                    alt={`Portfolio Image ${index + 1}`}
                    className="portfolio-image"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

export default ArtistInfo;
