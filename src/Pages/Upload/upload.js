
// UploadPage.js
import React from 'react';
import Navbar from '../../Components/NavBar/navbar';
import publishIcon from '../../assets/publish.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultThumbnail from '../../assets/alec.jpg';

function Upload() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const photoData = {
      title: event.target.elements['photo-title'].value,
      description: event.target.elements['photo-description'].value,
      image: '/static/images/upload-photo-preview.jpg',
    };

    axios
      .post('http://localhost:1234/upload', photoData) 
      .then((response) => {
        alert('Photo upload successful');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error uploading photo:', error);
        alert('Photo upload failed');
      });
  };

  return (
    <>
      <Navbar />
      <h1 className="upload__header">Upload Photo</h1>
      <section className="upload">
        <form onSubmit={handleSubmit}>
          <article className="upload__form">
            <div className="upload__thumbnail-container">
              <h3 className="upload__thumbnail-header">Photo thumbnail</h3>
              <img className="upload__thumbnail" src={defaultThumbnail} alt="upload thumbnail"></img>
            </div>

            <div className="upload__form__input-group">
              <label className="upload__form__label" htmlFor="photo-title">
                Title your photo
              </label>
              <input
                className="upload__form__input"
                placeholder="Add a title to your photo"
                type="text"
                name="photo-title"
                id="photo-title"
              ></input>
              <label className="upload__form__label" htmlFor="photo-description">
                Add a photo description
              </label>
              <textarea
                className="upload__form__input-textarea"
                placeholder="Add a description to your photo"
                type="text"
                name="photo-description"
                id="photo-description"
              ></textarea>
            </div>
          </article>

          <div className="upload__form__buttons-container">
            <button className="upload__form__submit-button" type="submit">
              <img className="upload__form__submit-button-icon" src={publishIcon} alt="Publish Icon"></img>
              Publish
            </button>
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
