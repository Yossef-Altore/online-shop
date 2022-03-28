import { Link } from "react-router-dom";
import "./RegisterHeader.scss";
const RegisterHeader = () => {
  return (
    <header className="registerHeader">
      <Link to="/">
        <img src="images/mainlogo1.png" alt="main logo" className="mainLogo" />
      </Link>

      <nav className="navigation">
        <div>
          <Link to="/">
            <button>דף בית</button>
          </Link>
          <Link to="/login">
            <button>כניסה</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default RegisterHeader;
