import "./BasketItem.scss";
const BasketItem = (props) => {
  const handleDeleteItem = () => {
    props.deleteItem(props.id, props.index);
  };
  return (
    <div className="itemInBasket">
      <img src="images/product.png" alt="" />
      <div>
        <span>{props.name}</span>
        <span className="itemDescription">{props.description}</span>
        <span>{props.count} יח'</span>
      </div>
      <span className="totalPrice">{props.totalItemPrice} ש"ח</span>
      <button className="deleteItemFromBasket" onClick={handleDeleteItem}>
        מחק
      </button>
    </div>
  );
};
export default BasketItem;
