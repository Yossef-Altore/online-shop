import "./ProductsDiv.scss";
import ProductCard from "./ProductCard";
const ProductsDiv = (props) => {
  return (
    <div className="ProductsDiv">
      {props.products.map((product) => {
        return (
          <ProductCard
            name={product.productName}
            description={product.description}
            price={product.price}
            key={product._id}
            id={product._id}
          />
        );
      })}
    </div>
  );
};
export default ProductsDiv;
