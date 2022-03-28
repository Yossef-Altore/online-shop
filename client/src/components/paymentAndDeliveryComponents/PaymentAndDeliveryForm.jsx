import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./PaymentAndDeliveryForm.scss";
import TheForm from "./TheForm";
const PaymentAndDeliveryForm = () => {
  const [basket, setBasket] = useState("");
  const [userFiName, setUserFiName] = useState("");
  const [userLaName, setUserLaName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  // get info about the basket that need to br payed
  const nonClosedBasket = useCallback(() => {
    axios
      .get("/notClosedBasketForPayment")
      .then((res) => res.data)
      .then((data) => {
        const { _id: id } = data.basket;
        const { items } = data.basket;
        const basket = { id, items };
        let totalP = 0;
        items.map((item) => {
          totalP += item.totalItemPrice;
        });
        setBasket(basket);
        setUserFiName(data.firstName);
        setUserLaName(data.lastName);
        setUserPhone(data.phoneNumber);
        setTotalPrice(totalP);
      });
  }, []);
  useEffect(() => {
    nonClosedBasket();
  }, [nonClosedBasket]);

  return (
    <div className="PaymentAndDeliveryForm">
      <div className="userName">
        <p>
          שלום {userFiName} {userLaName}
        </p>
        <p>אנא מלא פרטי משלוח ותשלום </p>
      </div>
      <div className="addressAndPaymentForm">
        <TheForm totalPrice={totalPrice} basketId={basket.id} />
      </div>
    </div>
  );
};
export default PaymentAndDeliveryForm;
