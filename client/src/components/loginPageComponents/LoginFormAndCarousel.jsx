import "./LoginFormAndCarousel.scss";
import LoginCarousel from "./LoginCarousel";
import LoginForm from "./LoginForm";
const LoginFormAndCarousel = () => {
  return (
    <div className="LoginFormAndCarousel">
      <LoginCarousel />
      <LoginForm />
    </div>
  );
};
export default LoginFormAndCarousel;
