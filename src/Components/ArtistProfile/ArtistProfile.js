// ArtistProfile.js
import React from 'react';
import './ArtistProfile.scss';

function ArtistProfile({ artistInfo }) {
    if (!artistInfo) {
        return <div>Loading...</div>;
    }

    const { name, artStyle, zipCode, profileImage, portfolio } = artistInfo;

    return (
        <div className="artist-profile">
            <div className="artist-profile__header">
                <img className="artist-profile__image" src={profileImage} alt={`Profile of ${name}`} />
                <h1 className="artist-profile__name">{name}</h1>
                <p className="artist-profile__art-style">{artStyle}</p>
                <p className="artist-profile__zip-code">{zipCode}</p>
            </div>
            <div className="artist-profile__portfolio">
                <h2>Portfolio</h2>
                <div className="artist-profile__portfolio-images">
                    {portfolio.map((item, index) => (
                        <img key={index} src={item.url} alt={`Artwork ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistProfile;
