import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import Joi from "joi-browser";
import "./RegisterForm.scss";
import registerSchema from "../../validation/registerValidation";
import axios from "axios";
const RegisterForm = () => {
  //routes
  const navigate = useNavigate();
  //for redux actions
  const dispatch = useDispatch();
  // handle error message on dom
  const [errorMessage, setErrorMessage] = useState("");
  // catch all the inputs
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  // on submit the form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // get values from inputs
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    // change the inputs back to black , when there is empty input its border
    // become red, if its not empty make it black again
    firstNameRef.current.style.border = "2px solid black";
    lastNameRef.current.style.border = "2px solid black";
    phoneNumberRef.current.style.border = "2px solid black";
    emailRef.current.style.border = "2px solid black";
    passwordRef.current.style.border = "2px solid black";
    confirmPasswordRef.current.style.border = "2px solid black";
    // check if input empty , if so make it border red
    if (firstName === "") {
      firstNameRef.current.style.border = "3px solid red";
    }
    if (lastName === "") {
      lastNameRef.current.style.border = "3px solid red";
    }
    if (phoneNumber === "") {
      phoneNumberRef.current.style.border = "3px solid red";
    }
    if (email === "") {
      emailRef.current.style.border = "3px solid red";
    }
    if (password === "") {
      passwordRef.current.style.border = "3px solid red";
    }
    if (confirmPassword === "") {
      confirmPasswordRef.current.style.border = "3px solid red";
    }
    // check input value length and display message
    if (firstName.length < 2) {
      setErrorMessage("שם פרטי חייב להיות מינימום 2 תוים");
      return;
    }
    if (lastName.length < 2) {
      setErrorMessage("שם משפחה חייב להיות מינימום 2 תוים");
      return;
    }
    if (phoneNumber.length < 8) {
      setErrorMessage("מספר טלפון חייב להיות מספר תקין ומינימום 8 תוים");
      return;
    }
    if (
      email.length < 6 ||
      email.includes(".") === false ||
      email.includes("@") === false
    ) {
      setErrorMessage("אנא הכנס דואר אלקטרוני תקין");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("סיסמה מינימום 8 תוים");
      return;
    }
    // check password confirmation
    if (password !== confirmPassword) {
      setErrorMessage("אנא אמת סיסמאות");
      return;
    }
    // joi validation
    const validateValue = Joi.validate(
      {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        confirmPassword,
      },
      registerSchema,
      { abortEarly: false }
    );
    if (
      validateValue.error &&
      validateValue.error.message.includes("phoneNumber")
    ) {
      setErrorMessage("אנא הכנס מספר טלפון תקין");
      return;
    }
    // if every thing is okay send post request to register the new user
    // if res is ok then set the token in the local storage and handle isLogged in redux and navigate to market
    axios
      .post("/register", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 201) {
          return res.data;
        }
      })
      .then((data) => {
        dispatch(authActions.login());
        localStorage.setItem("token", data.token);
        navigate("/market");
      })
      .catch((error) => {
        if (error.response.data === "email already exists") {
          setErrorMessage("הדואר אלקטרוני הזה כבר קיים!");
        }
      });
  };
  // handle submiting form on enter key press

  const memoSubmitOnEnter = useCallback(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === 13) {
        handleFormSubmit();
      }
    });
  }, [handleFormSubmit]);
  useEffect(() => {
    memoSubmitOnEnter();
    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.code === 13) {
          handleFormSubmit();
        }
      });
    };
  }, [memoSubmitOnEnter, handleFormSubmit]);
  return (
    <form className="RegisterForm" onSubmit={handleFormSubmit}>
      <h1>הרשמה</h1>
      <div className="firstName">
        <input
          type="text"
          name="firstName"
          placeholder="שם פרטי"
          ref={firstNameRef}
        />
        <label htmlFor="firstName">שם פרטי</label>
      </div>
      <div className="LastName">
        <input
          type="text"
          name="lastName"
          placeholder="שם משפחה"
          ref={lastNameRef}
        />
        <label htmlFor="lastName">שם משפחה</label>
      </div>
      <div className="phoneNumber">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="מספר נייד"
          ref={phoneNumberRef}
        />
        <label htmlFor="phoneNumber">מספר נייד</label>
      </div>
      <div className="email">
        <input
          type="email"
          name="email"
          placeholder="דואר אלקטרוני"
          ref={emailRef}
        />
        <label htmlFor="email">דואר אלקרטרוני</label>
      </div>
      <div className="password">
        <input
          type="password"
          name="password"
          placeholder="סיסמה כניסה לאתר - מינימום 8 תוים"
          ref={passwordRef}
        />
        <label htmlFor="password">סיסמה כניסה לאתר</label>
      </div>
      <div className="confirmPassword">
        <input
          type="password"
          name="confirmPassword"
          id=""
          placeholder="יש להזין סיסמה שוב"
          ref={confirmPasswordRef}
        />
        <label htmlFor="confirmPassword">יש להזין סיסמה שוב</label>
      </div>
      <span className="errorHandler">{errorMessage}</span>
      <button className="registerBtn">שמירה</button>

      <Link to="/login">
        <span>כניסה לחשבון</span>
      </Link>
    </form>
  );
};
export default RegisterForm;
