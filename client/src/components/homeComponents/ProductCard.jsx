import "./ProductsCard.scss";
const ProductCard = (props) => {
  return (
    <div className="productCard">
      <div className="imgDiv">
        <img src="images/product.png" alt="product" />
      </div>
      <div className="descAndPrice">
        <h2>{props.name}</h2>
        <h3>{props.description}</h3>
        <p>{props.price} ש"ח</p>
      </div>
    </div>
  );
};
export default ProductCard;
