import { useCallback, useEffect, useState } from "react";
import "./Carousel.scss";
const Carousel = () => {
  //set the images for the carousel in home
  // to add image just add its path in images array
  const images = [
    "images/carouselInHome/1.webp",
    "images/carouselInHome/2.webp",
    "images/carouselInHome/3.webp",
    "images/carouselInHome/4.webp",
  ];
  // x is the images array index
  let x = 0;
  // set the interval to change the images
  let changeImageInterval;
  const [imageInCarousel, setImageInCarousel] = useState(images[x]);
  const changeImage = useCallback(() => {
    changeImageInterval = setInterval(() => {
      x++;
      if (x === images.length) {
        x = 0;
      }
      setImageInCarousel(images[x]);
    }, 3000);
  }, [setImageInCarousel, changeImageInterval]);
  useEffect(() => {
    changeImage();
    return () => {
      clearInterval(changeImageInterval);
    };
  }, [changeImage]);
  return (
    <div className="carousel">
      <img src={imageInCarousel} alt="image" />
    </div>
  );
};
export default Carousel;
