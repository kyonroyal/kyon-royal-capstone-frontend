import React, { useState, useEffect } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";

function ImageGallery() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const imagesListRef = ref(storage, "artImages/");
  
    listAll(imagesListRef)
      .then((response) => {
        const urls = [];
  
        response.items.forEach((item) => {
          getDownloadURL(item)
            .then((url) => {
              urls.push(url);
            })
            .catch((urlError) => {
              console.error("Error getting download URL:", urlError);
            });
        });
  
        // Set the URLs after all promises have resolved
        Promise.all(urls)
          .then((resolvedUrls) => {
            setImageUrls(resolvedUrls);
          })
          .catch((promiseError) => {
            console.error("Error resolving promises:", promiseError);
          });
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
  
}

export default ImageGallery;
