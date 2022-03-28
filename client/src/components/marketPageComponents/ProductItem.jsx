import "./ProductItem.scss";
import QuantityCount from "./QuantityCount";
import axios from "axios";
const ProductItem = (props) => {
  let prodCount;
  const countOfProductQuantityHandler = (count) => {
    prodCount = count;
  };
  const addProductHandler = () => {
    if (prodCount === undefined) {
      prodCount = 1;
    }
    let totalItemPrice = parseInt(props.price) * parseInt(prodCount);

    axios
      .post("/addBasketList", {
        id: props.id,
        name: props.name,
        description: props.description,
        price: props.price,
        count: prodCount,
        totalItemPrice: totalItemPrice,
      })
      .then((res) => {
        if (res.status === 201) {
          props.addedItem();
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  return (
    <div className="item">
      <img src="images/product.png" alt="" />
      <p className="productsPrice">{props.price} ש"ח</p>
      <p className="shortDescription">{props.description}</p>
      <p className="productName">{props.name}</p>
      <QuantityCount countOfProductQuantity={countOfProductQuantityHandler} />
      <button className="addProductBtn" onClick={addProductHandler}>
        הוסף
      </button>
    </div>
  );
};
export default ProductItem;
