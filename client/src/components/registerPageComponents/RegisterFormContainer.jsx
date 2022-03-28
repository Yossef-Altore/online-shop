import "./RegisterFormContainer.scss";
import RegisterForm from "./RegisterForm";
const RegisterFormContainer = () => {
  return (
    <div className="RegisterFormMainDiv">
      <div className="RegisterFormSecDiv">
        <RegisterForm />
        <img src="images/registerImg/1.webp" alt="" />
      </div>
    </div>
  );
};
export default RegisterFormContainer;
