import "./PaymentFormAndImage.scss";
import PaymentAndDeliveryForm from "./PaymentAndDeliveryForm";

const PaymentFormAndImage = () => {
  return (
    <div className="PaymentFormAndImage">
      <div className="imageDiv">
        <img src="images/payment.jpg" alt="" />
      </div>
      <PaymentAndDeliveryForm />
    </div>
  );
};

export default PaymentFormAndImage;
