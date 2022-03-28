import "./TheForm.scss";
import today from "../../helpers/dateForDatePickerINDeliveryForm";
import { useRef, useState } from "react";
import formValidation from "../../helpers/deliveryFormValidation";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import AfterPaymentSuccess from "./AfterPaymentSuccess";
import { useNavigate } from "react-router-dom";
const TheForm = (props) => {
  const navigate = useNavigate();
  // display spinner
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAfterPayment, setShowAfterPayment] = useState(false);
  // ref to the inputs
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const houseRef = useRef(null);
  const deliveryDateRef = useRef(null);
  const deliveryHourRef = useRef(null);
  const creditCardRef = useRef(null);
  const creditCardExpRef = useRef(null);
  const cvvRef = useRef(null);
  const creditCardOwnerRef = useRef(null);

  // handle the form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (props.totalPrice === "") {
      navigate("/");
      return;
    }
    formValidation(
      cityRef,
      streetRef,
      houseRef,
      deliveryDateRef,
      deliveryHourRef,
      creditCardRef,
      creditCardExpRef,
      cvvRef,
      creditCardOwnerRef
    );
    const city = cityRef.current.value;
    const street = streetRef.current.value;
    const house = houseRef.current.value;
    const deliveryDate = deliveryDateRef.current.value;
    const deliveryHour = deliveryHourRef.current.value;
    const creditCard = creditCardRef.current.value;
    const creditCardExp = creditCardExpRef.current.value;
    const cvv = cvvRef.current.value;
    const creditCardOwner = creditCardOwnerRef.current.value;
    const basketId = props.basketId;
    if (
      city === "" ||
      street === "" ||
      house === "" ||
      deliveryDate === "" ||
      deliveryHour === "" ||
      creditCard === "" ||
      creditCardExp === "" ||
      cvv === "" ||
      creditCardOwner === "" ||
      basketId === ""
    ) {
      return;
    }
    setShowSpinner(true);
    setTimeout(() => {
      axios
        .post("/setBasketToDelivery", {
          city: city,
          street: street,
          house: house,
          deliveryDate: deliveryDate,
          deliveryHour: deliveryHour,
          creditCard: creditCard,
          creditCardExp: creditCardExp,
          cvv: cvv,
          creditCardOwner: creditCardOwner,
          basketId: basketId,
        })
        .then((res) => {
          setShowSpinner(false);
          setShowAfterPayment(true);
          if (res.status === 201) {
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, 1000);
  };
  return (
    <>
      <form onSubmit={handleFormSubmit} className="addressAndPaymentForm">
        <h2>כתובת:</h2>
        <div className="address">
          <div className="city">
            <input type="text" placeholder="עיר" ref={cityRef} />
            <label htmlFor="city">עיר</label>
          </div>
          <div className="street">
            <input type="text" placeholder="רחוב" ref={streetRef} />
            <label htmlFor="street">רחוב</label>
          </div>
          <div className="house">
            <input type="number" placeholder="מספר בית" ref={houseRef} />
            <label htmlFor="house">מספר בית</label>
          </div>
        </div>
        <div className="time">
          <div className="deliveryDate">
            <input
              type="date"
              name="deliveryDate"
              min={today}
              ref={deliveryDateRef}
            />
            <label htmlFor="deliveryDate">תאריך</label>
          </div>
          <div className="deliveryHour">
            <select
              name="deliveryHour"
              defaultValue="08:00"
              ref={deliveryHourRef}
            >
              <option value="08:00">08:00</option>
              <option value="10:00">10:00</option>
              <option value="12:00">12:00</option>
              <option value="14:00">14:00</option>
              <option value="16:00">16:00</option>
              <option value="18:00">18:00</option>
              <option value="20:00">20:00</option>
            </select>
            <label htmlFor="DeliveryHour">שעה</label>
          </div>
        </div>
        <h2>פרטי תשלום:</h2>
        <div className="paymentInfo">
          <div className="creditCard">
            <input
              type="number"
              name="creditCard"
              placeholder="מספר כרטיס"
              ref={creditCardRef}
            />
            <label htmlFor="creditCard">מספר כרטיס</label>
          </div>
          <div className="creditCardExp">
            <input
              type="date"
              name="creditCard"
              placeholder="תוקף"
              min={today}
              ref={creditCardExpRef}
            />
            <label htmlFor="creditCardExp">תוקף</label>
          </div>
          <div className="cvv">
            <input type="number" name="cvv" placeholder="cvv" ref={cvvRef} />
            <label htmlFor="creditCardExp">cvv</label>
          </div>
          <div className="creditCardOwner">
            <input
              type="text"
              name="creditCardOwner"
              placeholder="שם בעל כרטיס האשראי"
              ref={creditCardOwnerRef}
            />
            <label htmlFor="creditCardOwner">שם בעל כרטיס האשראי</label>
          </div>
          <div className="totalPrice">
            <p>סה"כ {props.totalPrice} ש"ח</p>
          </div>
          <button className="submitFormBtn">אשר</button>
        </div>
      </form>
      {showSpinner && <LoadingSpinner />}
      {showAfterPayment && <AfterPaymentSuccess />}
    </>
  );
};

export default TheForm;
