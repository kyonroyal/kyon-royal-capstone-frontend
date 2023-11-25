
import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

function Map() {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 25.716527938842773,
    lng: -80.27212524414062,
  };

  const position = {
    lat: 25.716527938842773,
    lng: -80.27212524414062,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAcIzDGRwzVEDZL7lyxAWsR-W_wSTHNY6c">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
      >
        <Marker position={position} title="My location" />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
