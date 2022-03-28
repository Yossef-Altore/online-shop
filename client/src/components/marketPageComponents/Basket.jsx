import axios from "axios";
import "./Basket.scss";
import BasketItem from "./BasketItem";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Basket = (props) => {
  const navigate = useNavigate();
  const emptyBasket = useRef(null);
  const deleteItemHandler = (index) => {
    axios
      .delete("/deleteBasketItem", {
        data: { index },
      })
      .then((res) => {
        if (res.data === "deleted") {
          props.handleRenderBasketAfterDelete();
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  let finalPrice = 0;
  if (props.basket) {
    props.basket.map((item) => {
      finalPrice += item.totalItemPrice;
    });
  }

  const navigateToPayment = () => {
    if (finalPrice === 0) {
      emptyBasket.current.style.backgroundColor = "red";
      emptyBasket.current.style.color = "white";
      return;
    }
    navigate("/paymentAndDelivery");
  };
  return (
    <div className="basketDiv">
      {props.basket.length === 0 && (
        <div className="ifEmptyBasket" ref={emptyBasket}>
          <span>סל הקניות ריק!</span>
          <span>התחל לקנות</span>
        </div>
      )}
      {props.basket &&
        props.basket.map((item, index) => {
          return (
            <BasketItem
              key={index}
              id={item.id}
              name={item.name}
              description={item.description}
              count={item.count}
              totalItemPrice={item.totalItemPrice}
              deleteItem={deleteItemHandler}
              index={index}
            />
          );
        })}
      <div className="priceAndForward">
        <div className="totalBasketPrice">
          <span>{finalPrice} ש"ח</span>
        </div>
        <div className="payment" onClick={navigateToPayment}>
          <span>לתשלום</span>
        </div>
      </div>
    </div>
  );
};
export default Basket;
