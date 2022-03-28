import { useCallback, useEffect, useState } from "react";
import "./LoginCarousel.scss";
const LoginCarousel = () => {
  const images = [
    "images/carouselInLogin/1.png",
    "images/carouselInLogin/2.png",
  ];
  const [imageInCarousel, setImageInCarousel] = useState(images[0]);
  let changeImagesInterval;
  let x = 0;
  const changeImageFunc = useCallback(() => {
    changeImagesInterval = setInterval(() => {
      x++;
      if (x === images.length) {
        x = 0;
      }
      setImageInCarousel(images[x]);
    }, 6000);
  }, [changeImagesInterval, x]);

  useEffect(() => {
    changeImageFunc();
    return () => {
      clearInterval(changeImagesInterval);
    };
  }, [changeImageFunc, changeImagesInterval]);
  return (
    <div className="LoginCarouselDiv">
      <img src={imageInCarousel} alt="" />
    </div>
  );
};
export default LoginCarousel;
