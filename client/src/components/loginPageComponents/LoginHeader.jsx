import { Link } from "react-router-dom";
import "./LoginHeader.scss";
const LoginHeader = () => {
  return (
    <header className="loginHeader">
      <Link to="/">
        <img src="images/mainlogo1.png" alt="main logo" className="mainLogo" />
      </Link>

      <nav className="navigation">
        <div>
          <Link to="/">
            <button>דף בית</button>
          </Link>
          <Link to="/register">
            <button>הרשמה</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default LoginHeader;
