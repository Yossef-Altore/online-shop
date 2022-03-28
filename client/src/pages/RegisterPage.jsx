import "./RegisterPage.scss";
import RegisterHeader from "../components/registerPageComponents/RegisterHeader";
import RegisterForm from "../components/registerPageComponents/RegisterFormContainer";
const RegisterPage = () => {
  return (
    <div className="RegisterPageDiv">
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
};
export default RegisterPage;
