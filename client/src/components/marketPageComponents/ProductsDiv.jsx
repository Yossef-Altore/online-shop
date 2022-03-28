import "./ProductsDiv.scss";
import ProductItem from "./ProductItem";
const ProductsDiv = (props) => {
  const handleAddingItem = () => {
    props.addingItem();
  };
  return (
    <div className="ProductsDivInMarket">
      {props.products.map((product) => {
        return (
          <ProductItem
            name={product.productName}
            description={product.description}
            price={product.price}
            key={product._id}
            id={product._id}
            addedItem={handleAddingItem}
          />
        );
      })}
    </div>
  );
};
export default ProductsDiv;
