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
      setErrorMessage("???? ???????? ???????? ?????????? ?????????????? 2 ????????");
      return;
    }
    if (lastName.length < 2) {
      setErrorMessage("???? ?????????? ???????? ?????????? ?????????????? 2 ????????");
      return;
    }
    if (phoneNumber.length < 8) {
      setErrorMessage("???????? ?????????? ???????? ?????????? ???????? ???????? ???????????????? 8 ????????");
      return;
    }
    if (
      email.length < 6 ||
      email.includes(".") === false ||
      email.includes("@") === false
    ) {
      setErrorMessage("?????? ???????? ???????? ???????????????? ????????");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("?????????? ?????????????? 8 ????????");
      return;
    }
    // check password confirmation
    if (password !== confirmPassword) {
      setErrorMessage("?????? ?????? ??????????????");
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
      setErrorMessage("?????? ???????? ???????? ?????????? ????????");
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
          setErrorMessage("?????????? ???????????????? ?????? ?????? ????????!");
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
      <h1>??????????</h1>
      <div className="firstName">
        <input
          type="text"
          name="firstName"
          placeholder="???? ????????"
          ref={firstNameRef}
        />
        <label htmlFor="firstName">???? ????????</label>
      </div>
      <div className="LastName">
        <input
          type="text"
          name="lastName"
          placeholder="???? ??????????"
          ref={lastNameRef}
        />
        <label htmlFor="lastName">???? ??????????</label>
      </div>
      <div className="phoneNumber">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="???????? ????????"
          ref={phoneNumberRef}
        />
        <label htmlFor="phoneNumber">???????? ????????</label>
      </div>
      <div className="email">
        <input
          type="email"
          name="email"
          placeholder="???????? ????????????????"
          ref={emailRef}
        />
        <label htmlFor="email">???????? ??????????????????</label>
      </div>
      <div className="password">
        <input
          type="password"
          name="password"
          placeholder="?????????? ?????????? ???????? - ?????????????? 8 ????????"
          ref={passwordRef}
        />
        <label htmlFor="password">?????????? ?????????? ????????</label>
      </div>
      <div className="confirmPassword">
        <input
          type="password"
          name="confirmPassword"
          id=""
          placeholder="???? ?????????? ?????????? ??????"
          ref={confirmPasswordRef}
        />
        <label htmlFor="confirmPassword">???? ?????????? ?????????? ??????</label>
      </div>
      <span className="errorHandler">{errorMessage}</span>
      <button className="registerBtn">??????????</button>

      <Link to="/login">
        <span>?????????? ????????????</span>
      </Link>
    </form>
  );
};
export default RegisterForm;
