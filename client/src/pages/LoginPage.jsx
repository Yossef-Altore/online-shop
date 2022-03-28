import "./LoginPage.scss";
import LoginHeader from "../components/loginPageComponents/LoginHeader";
import LoginFormAndCarousel from "../components/loginPageComponents/LoginFormAndCarousel";
const LoginPage = () => {
  return (
    <div className="loginPageDiv">
      <LoginHeader />
      <LoginFormAndCarousel />
    </div>
  );
};
export default LoginPage;
