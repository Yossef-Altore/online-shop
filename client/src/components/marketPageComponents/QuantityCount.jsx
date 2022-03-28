import { useState, Fragment, useEffect } from "react";
import "./QuantityCount.scss";
const QuantityCount = (props) => {
  let newNum;
  const [quantityValue, setQuantityValue] = useState(1);
  const handleCounterIncrement = () => {
    setQuantityValue((prevNum) => {
      newNum = prevNum + 1;
      props.countOfProductQuantity(newNum);
      return newNum;
    });
  };
  const handleCounterDecrement = () => {
    setQuantityValue((prevNum) => {
      if (prevNum === 1) {
        props.countOfProductQuantity(1);
        return 1;
      }
      newNum = prevNum - 1;
      props.countOfProductQuantity(newNum);
      return newNum;
    });
  };
  useEffect(() => {
    props.countOfProductQuantity(quantityValue);
  }, []);

  return (
    <Fragment>
      <div className="quantityCountDiv">
        <div className="plusSign" onClick={handleCounterIncrement}>
          <span>+</span>
        </div>
        <p className="quantityCounter">{quantityValue}</p>
        <span className="spec">יח'</span>
        <div className="minusSign" onClick={handleCounterDecrement}>
          <span>-</span>
        </div>
      </div>
    </Fragment>
  );
};
export default QuantityCount;
