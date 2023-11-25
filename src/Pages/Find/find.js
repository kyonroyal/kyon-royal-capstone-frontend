import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Map from '../../Components/Map/map';
import Navbar from '../../Components/NavBar/navbar';
function Find() {
  const [users, setUsers] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const [nearestArtists, setNearestArtists] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcIzDGRwzVEDZL7lyxAWsR-W_wSTHNY6c&libraries=places`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // checks if a zip is valid and translates it into lat/lng coordinates
  async function geocodeZipCode(zipCode) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyAcIzDGRwzVEDZL7lyxAWsR-W_wSTHNY6c`
      );

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        return location;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return false;
    }
  }

  // handles the form submission
  async function handleFormSubmit(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const zip = event.target.zip.value;

    if (!name || !zip) {
      alert('Fields cannot be empty');
      return;
    }

    try {
      const coordinates = await geocodeZipCode(zip);

      if (!coordinates) {
        alert('Please provide a valid zip code!');
      } else {
        const newUser = {
          name: name,
          zip: zip,
          coordinates: coordinates,
        };
        addUser(newUser, coordinates);
      }
    } catch (error) {
      console.error(error.status);
    }
  }

  // adds a new user
  async function addUser(newUser, coordinates) {
    try {
      const response = await axios.post(`http://localhost:1234/`, newUser);
      window.location.href = '/successful-registration';
      setUsers([...users, newUser]);
      setMarkers([...markers, newUser.coordinates]);
      groupNearestArtists(coordinates);
    } catch (error) {
      console.error(error);
    }
  }

  // groups artists based on proximity to the given coordinates
  function groupNearestArtists(userCoordinates) {
    const groupedArtists = users.reduce((groups, artist) => {
      const distance = calculateDistance(userCoordinates, artist.coordinates);
      if (!groups[distance]) {
        groups[distance] = [];
      }
      groups[distance].push(artist);
      return groups;
    }, {});

    // Sort the groups based on distance
    const sortedGroups = Object.keys(groupedArtists).sort((a, b) => parseFloat(a) - parseFloat(b));

    // Update the state with nearest artists
    const nearestArtists = sortedGroups.map(distance => groupedArtists[distance]).flat();
    setNearestArtists(nearestArtists);
  }

  // calculates the distance between two sets of coordinates
  function calculateDistance(coord1, coord2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(coord2.lat - coord1.lat);
    const dLon = deg2rad(coord2.lng - coord1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  // converts degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    
    <div className="find-artists">
        <Navbar />
      <form className="find-artists__form" onSubmit={handleFormSubmit}>
        <div className="find-artists__form-group">
          <label className="find-artists__label" htmlFor="name">
            Name:
            <input type="text" id="name" name="name" className="find-artists__input" placeholder="Name" />
          </label>
        </div>
        <div className="find-artists__form-group">
          <label className="find-artists__label" htmlFor="zip">
            Zip Code:
            <input type="text" id="zip" name="zip" className="find-artists__input" placeholder="Zip Code" />
          </label>
        </div>
        <button className="find-artists__button" type="submit">
          Submit
        </button>
      </form>

      <div className="nearest-artists-list">
        <h2>Nearest Artists:</h2>
         {/* <Map/>  */}
        <ul>
          {nearestArtists.map(artist => (
            <li key={artist.name}>{artist.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Find;
