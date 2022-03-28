import "./AfterPaymentSuccess.scss";
import { Link } from "react-router-dom";
const AfterPaymentSuccess = () => {
  return (
    <div className="AfterPaymentSuccess">
      <div>
        <p>התשלום בוצע בהצלחה</p>
        <Link to="/">
          <button>לבית</button>
        </Link>
        <Link to="/market">
          <button>להמשך קנייה</button>
        </Link>
      </div>
    </div>
  );
};
export default AfterPaymentSuccess;
