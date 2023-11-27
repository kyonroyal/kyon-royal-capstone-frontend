// Gallery.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/navbar.js';
import Hero from '../../Components/Hero/hero.js';
import NextPhotos from '../../Components/NextPhotos/nextPhotos.js';
import ArtistInfo from '../../Components/ArtistsInfo/artistsInfo.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../Gallery/gallery.scss"


function Gallery() {
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState({});
  const [nextArtists, setNextArtists] = useState([]);
  const { id } = useParams();

  const handleArtistSelect = (selectedArtist) => {
    if (currentArtist && currentArtist.id !== selectedArtist.id) {
      setNextArtists((prevNextArtists) => [currentArtist, ...prevNextArtists]);
    }

    setCurrentArtist(selectedArtist);
    setNextArtists((prevNextArtists) => prevNextArtists.filter((artist) => artist.id !== selectedArtist.id));
  };

  useEffect(() => {
    if (currentArtist && currentArtist.id) {
      setNextArtists(artists.filter((artist) => artist.id !== currentArtist.id));
    }
  }, [currentArtist, artists]);

  useEffect(() => {
    const fetchArtists = async () => {
      axios
        .get('http://localhost:1234/api/data') // Adjust the endpoint based on your API
        .then((response) => {
          setArtists(response.data);

          if (response.data.length > 0) {
            setCurrentArtist(response.data[0]);
            setNextArtists(response.data.slice(1));
          }
        })
        .catch((error) => console.error('Error fetching artists:', error));
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:1234/api/data/`) // Adjust the endpoint based on your API
        .then((response) => {
          setCurrentArtist(response.data);
        })
        .catch((error) => console.error('Error fetching artist details:', error));
    } else if (artists.length > 0) {
      setCurrentArtist(artists[0]);
    }
  }, [id, artists]);

  if (!currentArtist || nextArtists.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
      <Navbar />
      <Hero currentArtist={currentArtist}/>
      </header>
      <main className='main'>
        <section className='main__one'>
          <ArtistInfo artist={currentArtist} />
                   
        </section>
        <section className='main__two'>
          
          
          <NextPhotos artists={nextArtists} onArtistSelect={handleArtistSelect} />
        </section>
      </main>
    </>
  );
}

export default Gallery;
