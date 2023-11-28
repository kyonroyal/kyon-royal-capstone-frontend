import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../Components/NavBar/navbar';
import publishIcon from '../../assets/gallery-add-broken.svg';
import defaultThumbnail from '../../assets/image-outline.svg';
import '../Upload/upload.scss';

function Upload() {
  const navigate = useNavigate();
  const [imgUpload, setImgUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const uploadImg = async () => {
    if (imgUpload === null) return;
    const imageRef = ref(storage, `artImages/${uuidv4()}_${imgUpload.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, imgUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrls((prev) => [...prev, url]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const photoData = {
      title: event.target.elements['photo-title'].value,
      description: event.target.elements['photo-description'].value,
      image: imageUrls[0] || '/static/images/upload-photo-preview.jpg',
    };

    try {
      const response = await axios.post('http://localhost:1234/upload', photoData);
      alert('Photo upload successful');
      navigate('/');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Photo upload failed');
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="upload__header">Post Painting</h1>
      <section className="upload">
        <form onSubmit={handleSubmit}>
          <article className="upload__form">
            <div className="upload__thumbnail-container">
              <h3 className="upload__thumbnail-header">Painting thumbnail</h3>
              <img className="upload__thumbnail" src={defaultThumbnail} alt="upload thumbnail" />
            </div>

            <div className="upload__form__input-group">
              <label className="upload__form__label" htmlFor="photo-title">
                Title your painting
              </label>
              <input
                className="upload__form__input"
                placeholder="Add a title to your painting"
                type="text"
                name="photo-title"
                id="photo-title"
              />
              <label className="upload__form__label" htmlFor="photo-description">
                Add a painting image
              </label>
              <input
                className="upload__form__input"
                placeholder="Add an image of your painting"
                type="file"
                onChange={(event) => setImgUpload(event.target.files[0])}
                name="photo-title"
                id="photo-title"
              />
            </div>
          </article>

          <div className="upload__form__buttons-container">
            <button onClick={uploadImg} className="upload__form__submit-button" type="button">
              <img className="upload__form__submit-button-icon" src={publishIcon} alt="Publish Icon" />
              Post
            </button>
            {imageUrls.map((url) => (
              <img key={url} src={url} alt="Uploaded" />
            ))}
            <Link className="upload__form__cancel-button-link" to="/">
              <button className="upload__form__cancel-button">Cancel</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Upload;
