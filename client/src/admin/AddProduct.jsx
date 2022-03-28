import "./AddProduct.scss";
import AddProductForm from "./AddProductForm";
import axios from "axios";
const AddProduct = () => {
  const addProduct = (data) => {
    console.log(data);
    axios.post("/admin/addnewproduct", {
      data,
    });
  };
  return <AddProductForm addProductHandler={addProduct} />;
};
export default AddProduct;
