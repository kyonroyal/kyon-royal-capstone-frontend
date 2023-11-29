// import { useState, useEffect } from 'react';
// import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// const SubHero = ({ imagesListRef }) => {
//   const [imageUrls, setImageUrls] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const storage = getStorage();

//     const fetchImageUrls = async () => {
//       const response = await listAll(imagesListRef);

//       const urls = await Promise.all(
//         response.items.map(async (item) => {
//           const url = await getDownloadURL(item);
//           return url;
//         })
//       );

//       setImageUrls(urls);
//     };

//     fetchImageUrls();
//   }, [imagesListRef]);

//   const handleToggle = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
//   };

//   return (
//     <div>
//       {imageUrls.length > 0 && (
//         <img
//           src={imageUrls[currentIndex]}
//           alt={`Image ${currentIndex + 1}`}
//           style={{ width: '100%', height: 'auto' }}
//         />
//       )}

//       <button onClick={handleToggle}>Toggle Image</button>
//     </div>
//   );
// };

// export default SubHero;
