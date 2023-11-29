import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image1 from "../../assets/Images/AB0E81E7-043A-49CA-809E-942B69941994.jpg";
import Image2 from "../../assets/Images/98AB691B-C05D-4E44-8F10-98C9F4B6AB99.jpg";
import Image3 from "../../assets/Images/butterfly.jpg";
import Image4 from "../../assets/Images/IMG_5189.JPG";
import "../ToggleImage/toggleImg.scss";

const ToggleImage = () => {
  const imageList = [Image1, Image2, Image3, Image4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const controls = useAnimation();

  const handleSwipe = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % imageList.length
        : (currentImageIndex - 1 + imageList.length) % imageList.length;

    setCurrentImageIndex(newIndex);

    controls.start({ x: direction === "next" ? "-100%" : "100%" });
    controls.start({ x: 0 });
  };

  return (
    <div className="img-cntr">
      <motion.div
        className="image-container"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 50) {
            handleSwipe("prev");
          } else if (info.offset.x < -50) {
            handleSwipe("next");
          }
        }}
      >
        <motion.img
          src={imageList[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          animate={controls}
        />
      </motion.div>
      <div className="arrow-buttons">
        <button className="toggle-button" onClick={() => handleSwipe("prev")}>
          Previous
        </button>
        <button className="toggle-button" onClick={() => handleSwipe("next")}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ToggleImage;
