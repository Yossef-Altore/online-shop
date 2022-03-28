import axios from "axios";
import Header from "../components/homeComponents/Header";
import CarouselAndProducts from "../components/homeComponents/CarouselAndProducts";
import { useCallback, useEffect, useState } from "react";
import "./Home.scss";

const Home = () => {
  const [chosenMenu, setChosenMenu] = useState(null);
  const [products, setProducts] = useState([]);
  const chosenMenuHandler = (value) => {
    setChosenMenu(value);
  };
  const memorized = useCallback(() => {
    if (chosenMenu == null) {
      return;
    } else {
      axios
        .get("/products")
        .then((res) => {
          let items = res.data.map((item) => item._doc);
          return items;
        })
        .then((data) => {
          let filteredData = data.filter(
            (item) =>
              item.mainCategory === chosenMenu.chosenMainMenu &&
              item.secondCategory === chosenMenu.chosenSecondaryMenu
          );
          return filteredData;
        })
        .then((data) => setProducts(data));
    }
  }, [chosenMenu]);
  useEffect(() => {
    memorized();
  }, [chosenMenu, memorized]);
  console.log("home");
  return (
    <>
      <Header handleMenu={chosenMenuHandler} />
      <CarouselAndProducts products={products} />
    </>
  );
};

export default Home;
