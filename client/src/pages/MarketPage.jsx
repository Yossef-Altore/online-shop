import "./MarketPage.scss";
import MarketHeader from "../components/marketPageComponents/MarketHeader";
import BasketAndProducts from "../components/marketPageComponents/BasketAndProducts";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const MarketPage = () => {
  const [chosenMenu, setChosenMenu] = useState(null);
  const [products, setProducts] = useState([]);
  const chosenMenuHandler = (value) => {
    setChosenMenu(value);
  };
  // get the products array from DB
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
  return (
    <div className="marketDiv">
      <MarketHeader handleMenu={chosenMenuHandler} />
      <BasketAndProducts products={products} />
    </div>
  );
};

export default MarketPage;
