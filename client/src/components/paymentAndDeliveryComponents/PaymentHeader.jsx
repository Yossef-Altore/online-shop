import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

import "./PaymentHeader.scss";
const PaymentHeader = () => {
  // useNavigate
  const navigate = useNavigate();
  //for redux actions
  const dispatch = useDispatch();
  // logout
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <header className="PaymentHeader">
      <Link to="/">
        <img src="images/mainlogo1.png" alt="main logo" className="mainLogo" />
      </Link>

      <nav className="navigation">
        <div>
          <Link to="/market">
            <button>לסל</button>
          </Link>
          <button onClick={logoutHandler}>התנתק</button>
        </div>
      </nav>
    </header>
  );
};
export default PaymentHeader;
