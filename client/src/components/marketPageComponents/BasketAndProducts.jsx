import "./BasketAndProducts.scss";
import { useEffect, useCallback, useState } from "react";
import ProductsDiv from "./ProductsDiv";
import Basket from "./Basket";
import axios from "axios";
const CarouselAndProducts = (props) => {
  const [basketArr, setBasketArr] = useState([]);
  const [x, setX] = useState(0);
  const addingItemHandler = () => {
    setX((pre) => {
      return pre + 1;
    });
  };
  const deletingItemHandler = () => {
    setX((pre) => {
      return pre + 1;
    });
  };
  const getNotClosedBasket = useCallback(() => {
    axios.get("/notClosedBasket").then((res) => {
      if (res.data.items === undefined) {
        return;
      }
      setBasketArr(res.data.items);
    });
  }, []);
  useEffect(() => {
    getNotClosedBasket();
  }, [x]);
  return (
    <div className="basketAndProducts">
      {props.products !== [] && (
        <ProductsDiv products={props.products} addingItem={addingItemHandler} />
      )}
      <Basket
        basket={basketArr}
        handleRenderBasketAfterDelete={deletingItemHandler}
      />
    </div>
  );
};
export default CarouselAndProducts;
