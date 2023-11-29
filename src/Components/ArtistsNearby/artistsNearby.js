// ArtistsNearby.js

import React from 'react';
import '../ArtistsNearby/artistsNearby.scss';

function ArtistsNearby({ artists }) {
  return (
    <section className='artists-nearby'>
      <h2 className='artists-nearby__header'>Artists Nearby</h2>
      <div className='artists-nearby__container'>
        {artists.map((artist) => (
          <div key={artist.id} className='artists-nearby__group'>
            <h3 className='artists-nearby__zip-code'>Zip Code: {artist.zipCode}</h3>
            <div className='artists-nearby__images'>
              {artist.portfolio.map((item, index) => (
                <img
                  key={index}
                  src={item.url}
                  alt={`Artist ${artist.id} Portfolio Image ${index + 1}`}
                  className='artists-nearby__profile-image'
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArtistsNearby;
