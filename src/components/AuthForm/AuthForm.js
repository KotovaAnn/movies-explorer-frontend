import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function AuthForm(props) {
  const location = useLocation();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [inputNameIsValid, setInputNameIsValid] = useState(false);
  const [inputEmailIsValid, setInputEmailIsValid] = useState(false);
  const [inputPaswordIsValid, setInputPaswordIsValid] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  function handleNameChange(evt) {
    setName(evt.target.value);
    if (!evt.target.checkValidity()) {
      setErrorName(evt.target.validationMessage);
      setInputNameIsValid(false);
    } else {
      console.log('Имя')
      setErrorName(null);
      setInputNameIsValid(true);
    }
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    if (!evt.target.checkValidity()) {
      setErrorEmail(evt.target.validationMessage);
      setInputEmailIsValid(false);
    } else {
      console.log(evt.target.value)
      setErrorEmail(null);
      setInputEmailIsValid(true);
    }
  }
  
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
    if (!evt.target.checkValidity()) {
      setErrorPassword(evt.target.validationMessage);
      setInputPaswordIsValid(false);
    } else {
      console.log(evt.target.value)
      setErrorPassword(null);
      setInputPaswordIsValid(true);
    }
  }
  function setIsValid() {
    if(location.pathname === '/signup') {
      if(inputNameIsValid && inputEmailIsValid && inputPaswordIsValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    } else if(location.pathname === '/signin') {
      if(inputEmailIsValid && inputPaswordIsValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleAuth(name, email, password);
  }

  useEffect(() => {
    setIsValid();
  })

  return (
    <form className="auth-form" name="authForm" onSubmit={handleSubmit} noValidate>
      <h1 className="auth-form__title">{props.title}</h1>
      {
        (location.pathname === '/signup') ? (
          <div className="auth-form__input-container">
            <label className="auth-form__input-label">Имя
              <input
                id="auth-form-name-input"
                className={`auth-form__input auth-form__input_name ${!errorName || "auth-form__input-error"}`}
                required
                type="text"
                name="authInputName"
                placeholder="Введите имя"
                value={name || ""}
                onChange={handleNameChange}
                minLength={2}
                maxLength={40}
                />
            </label>
            <span 
              className="auth-form__error auth-form__error_type_name-input-error"
              id="auth-form-name-input-error">{errorName}
              </span>
          </div>
        ) : ('')
      }
      <div className="auth-form__input-container">
        <label className="auth-form__input-label">E-mail
          <input
            id="auth-form-email-input"
            className={`auth-form__input auth-form__input_email ${!errorEmail || "auth-form__input-error"}`}
            required
            type="email"
            name="authInputEmail"
            pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
            value={email || ""}
            onChange={handleEmailChange}
            />
        </label>
        <span 
          className="auth-form__error auth-form__error_type_email-input-error"
          id="auth-form-email-input-error">{errorEmail}
          </span>
      </div>
      <div className="auth-form__input-container">
        <label className="auth-form__input-label">Пароль
          <input
            id="auth-form-password-input"
            className={`auth-form__input auth-form__input_password ${!errorPassword || "auth-form__input-error"}`}
            required
            type="password"
            name="authInputPassoword"
            value={password || ""}
            onChange={handlePasswordChange}
            />
        </label>
        <span 
          className="auth-form__error auth-form__error_type_password-input-error"
          id="auth-form-password-input-error">{errorPassword}
          </span>
      </div>
      <button 
        className=
        {`
           ${!(errorEmail || errorName || errorPassword || !formIsValid) ? "auth-form__btn" : "auth-form__btn_no-active"}
           ${(location.pathname === '/signup') ? "auth-form__signup-btn" : "auth-form__signin-btn"}
        `}
        type="submit"
        disabled={errorEmail || errorName || errorPassword || (formIsValid === false)}>
          {props.buttonName}
        </button>
    </form>
  )
}

export default AuthForm;
