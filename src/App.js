// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'; 
import Gallery from '../src/Pages/Gallery/gallery';
import FindArtist from '../src/Pages/Find/find';
import UploadPhoto from '../src/Pages/Upload/upload';

function App  ()  {
  return (
   
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/find" element={<FindArtist />} />
          <Route path="/upload" element={<UploadPhoto />} />
        </Routes>
       </BrowserRouter>
       </>
  );
}




export default App;
