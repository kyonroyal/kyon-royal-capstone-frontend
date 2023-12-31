// Gallery.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/navbar.js';
import Hero from '../../Components/Hero/hero.js';
import NextPhotos from '../../Components/NextPhotos/nextPhotos.js';
import ArtistInfo from '../../Components/ArtistsInfo/artistsInfo.js';
import ImageGallery from '../../Components/ImageGallery/imageGallery.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../Gallery/gallery.scss"
import ToggleImage from '../../Components/ToggleImage/toggleImg.js';
import SubHero from '../../Components/Subhero/subhero.js';




function Gallery() {
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState({});
  const [nextArtists, setNextArtists] = useState([]);
//   const storage = getStorage();

// // Reference to the root of your storage bucket
// const imagesListRef = ref(storage, 'artImages/');
  const { id } = useParams();
// console.log(id);
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
      const artist=artists.find(artist => artist.id==id)
      setCurrentArtist(artist)
    console.log(artists)
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
     {/* <SubHero /> */}
      
      </header>
      <section>
      
      </section>
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