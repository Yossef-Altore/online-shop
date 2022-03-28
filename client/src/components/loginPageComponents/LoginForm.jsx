import { useRef, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import loginSchema from "../../validation/loginValidation";
import Joi from "joi-browser";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const LoginForm = () => {
  //routes
  const navigate = useNavigate();
  //for redux actions
  const dispatch = useDispatch();
  // state to error handler
  const [errorHandler, setErrorHandler] = useState("");
  // refs to the inputs to get values
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // handle login form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // if input is not empty after fixing make border color black
    emailRef.current.style.border = "2px solid black";
    passwordRef.current.style.border = "2px solid black";
    // get the input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // handle border color if input is empty
    if (email === "") {
      emailRef.current.style.border = "3px solid red";
    }
    if (password === "") {
      passwordRef.current.style.border = "3px solid red";
      return;
    }
    const { error } = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    if (error) {
      setErrorHandler("נא מלא פרטים בצורה תקינה");
      return;
    }
    // handle post request

    axios
      .post("/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((data) => {
        dispatch(authActions.login());
        localStorage.setItem("token", data.token);
        navigate("/market");
      })
      .catch((error) => {
        if (error.response.data === "דואר אלקטרוני או סיסמה לא תקינים") {
          setErrorHandler("דואר אלקטרוני או סיסמה לא תקינים!");
        }
      });
  };

  //
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
    <div className="LoginFormDiv">
      <h2>
        איזה כיף שבאת<span>&#128512;</span>
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="emailDiv">
          <input
            type="email"
            name="email"
            className="EmailInput"
            placeholder="כתובת מייל"
            ref={emailRef}
          />
          <label htmlFor="email">כתובת מייל:</label>
        </div>
        <div className="PasswordDiv">
          <input
            type="password"
            name="password"
            className="PasswordInput"
            placeholder="סיסמה"
            ref={passwordRef}
          />
          <label htmlFor="password">סיסמה:</label>
        </div>
        <span className="errorHandler">{errorHandler}</span>
        <button className="submitBtn">כניסה</button>
        <Link to="/register">
          <p>אין לך חשבון עדיין? להרשמה </p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
