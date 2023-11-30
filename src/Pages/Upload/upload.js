import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../Components/NavBar/navbar';
import publishIcon from '../../assets/gallery-add-broken.svg';
import defaultThumbnail from '../../assets/image-outline.svg';
import '../Upload/upload.scss';

const Upload = () => {
  const navigate = useNavigate();
  const [imgUpload, setImgUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const uploadImg = async () => {
    if (imgUpload === null) return;
    const imageRef = ref(storage, `artImages/${uuidv4()}_${imgUpload.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, imgUpload);
      const url = await getDownloadURL(snapshot.ref);
      await axios.post('http://localhost:1234/api/uploadphoto', {
        photoUrl: url
      }

      )
      console.log(url);
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
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="upload__header">
        Post Painting
      </motion.h1>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="upload"
      >
        <form onSubmit={handleSubmit}>
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="upload__form"
          >
            <div className="upload__thumbnail-container">
              <h3 className="upload__thumbnail-header">Painting thumbnail</h3>
              <img className="upload__thumbnail" src={defaultThumbnail} alt="upload thumbnail" />
            </div>

            <div className="upload__form__input-group">
              {/* <label className="upload__form__label" htmlFor="photo-title">
                Title your painting
              </label>
              <input
                className="upload__form__input"
                placeholder="Add a title to your painting"
                type="text"
                name="photo-title"
                id="photo-title"
              /> */}
              <label className="upload__form__label" htmlFor="photo-description">
                Upload an image
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
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="upload__form__buttons-container"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={uploadImg}
              className="upload__form__submit-button"
              type="button"
            >
              <img className="upload__form__submit-button-icon" src={publishIcon} alt="Publish Icon" />
              Post
            </motion.button>
            {imageUrls.map((url) => (
              <motion.img
                key={url}
                src={url}
                alt="Uploaded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              />
            ))}
            <Link className="upload__form__cancel-button-link" to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="upload__form__cancel-button">
                Cancel
              </motion.button>
            </Link>
          </motion.div>
        </form>
      </motion.section>
    </>
  );
};

export default Upload;
