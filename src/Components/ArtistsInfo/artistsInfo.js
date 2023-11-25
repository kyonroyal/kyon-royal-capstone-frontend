// ArtistInfo.js
import React from 'react';

function ArtistInfo({ artist }) {
  if (!artist) {
    return null; // Handle case where artist information is not available
  }

  const { name, artStyle, zipCode, profileImage, portfolio } = artist;

  return (
    <section className='artist-info'>
      <h1 className='artist-info__title'>{name}</h1>
      <article className='artist-info__details'>
        <div className='artist-info__group art-style-zip'>
          <h2 className='artist-info__art-style'>Art Style: {artStyle}</h2>
          <h2 className='artist-info__zip-code'>Zip Code: {zipCode}</h2>
        </div>
        <div className='artist-info__group profile-portfolio'>
          <img className='artist-info__profile-image' src={profileImage} alt={`${name}'s profile`} />
          {portfolio && portfolio.length > 0 && (
            <div className='artist-info__portfolio'>
              <h3>Portfolio</h3>
              <ul>
                {portfolio.map((item, index) => (
                  <li key={index}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Portfolio Image {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

export default ArtistInfo;
