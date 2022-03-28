import { useState, useRef } from "react";
import "./AddProductForm.scss";
import {
  supermarketMenu,
  kenyonAllForHomeMenu,
  pharmMenu,
  greenMenu,
} from "../helpers/secondMenuHelper";

const AddProductForm = (props) => {
  const MainMenu = ["בחר", "סופרמרקט", "קניון", "פארם", "גרין"];
  const [chosenMainMenu, setChosenMainMenu] = useState("");
  const [chosenSecondaryMenu, setChosenOnSecondaryMenu] = useState("");
  const [secondaryMenu, setSecondaryMenu] = useState("");
  const productName = useRef();
  const productDesc = useRef();
  const productPrice = useRef();

  const handleMainMenuChange = (e) => {
    setChosenMainMenu(e.target.value);
    if (e.target.value === "קניון") {
      setSecondaryMenu(kenyonAllForHomeMenu);
    }
    if (e.target.value === "סופרמרקט") {
      setSecondaryMenu(supermarketMenu);
    }
    if (e.target.value === "פארם") {
      setSecondaryMenu(pharmMenu);
    }
    if (e.target.value === "גרין") {
      setSecondaryMenu(greenMenu);
    }
  };
  const handleSecondaryMenuChange = (e) => {
    setChosenOnSecondaryMenu(e.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let productNameValue = productName.current.value;
    let productDescValue = productDesc.current.value;
    let productPriceValue = parseInt(productPrice.current.value, 10);
    if (chosenSecondaryMenu === "") {
      setChosenOnSecondaryMenu("מבצעים");
    }
    props.addProductHandler({
      chosenMainMenu,
      chosenSecondaryMenu,
      productNameValue,
      productDescValue,
      productPriceValue,
    });
  };
  return (
    <form className="addProductForm" onSubmit={handleFormSubmit}>
      <select value={chosenMainMenu} onChange={handleMainMenuChange}>
        {MainMenu.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
      <select value={chosenSecondaryMenu} onChange={handleSecondaryMenuChange}>
        {secondaryMenu.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
      <div>
        <label htmlFor="">שם פריט:</label>
        <input type="text" ref={productName} />
      </div>
      <div>
        <label htmlFor="">הסבר :</label>
        <input type="text" ref={productDesc} />
      </div>
      <div>
        <label htmlFor="">מחיר</label>
        <input type="text" ref={productPrice} />
      </div>
      <button>שלח</button>
    </form>
  );
};
export default AddProductForm;
