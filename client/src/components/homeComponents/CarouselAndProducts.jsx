import "./CarouselAndProducts.scss";
import Carousel from "./Carousel";
import ProductsDiv from "./ProductsDiv";

const CarouselAndProducts = (props) => {
  return (
    <div className="CarouselAndProducts">
      <Carousel />
      {props.products !== [] && <ProductsDiv products={props.products} />}
    </div>
  );
};
export default CarouselAndProducts;
