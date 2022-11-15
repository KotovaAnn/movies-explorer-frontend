import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from 'react';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isEdited, setIsEdited] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
    if(evt.target.value === currentUser.name) {
      setFormIsValid(false);
    }
    if (!evt.target.checkValidity()) {
      setErrorName(evt.target.validationMessage);
      setFormIsValid(false);
    } else {      
      setErrorName(null);
      setFormIsValid(true);
    }
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    if(evt.target.value === currentUser.email) {
      setFormIsValid(false);
    }
    if (!evt.target.checkValidity()) {
      setErrorEmail(evt.target.validationMessage);
      setFormIsValid(false);
    } else {      
      setErrorEmail(null);
      setFormIsValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if(name !== currentUser.name || email !== currentUser.email) {
      props.onSubmitButton();
      props.onUpdateUser({
        name,
        email,
      });
      setIsEdited(!isEdited);
    } else {
      setFormIsValid(false);
    }
  }

  function handleEditProfile() {
    setIsEdited(!isEdited);
  }

  return (
    <div className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h2>
      <form className="profile-form" name="profileForm" onSubmit={handleSubmit} noValidate>
        <fieldset className="profile-form__inputs-fieldset" disabled={!isEdited}>
          <div className="profile-form__input-container">
            <label className="profile-form__input-label">Имя
              <input 
                id="profile-form-name-input"
                className={`profile-form__input profile-form__input_name ${!errorName || "profile-form__input-error"}`}
                required
                type="text"
                name="profileInputName"
                placeholder="Введите имя"
                value={name || ""}
                onChange={handleNameChange}
                minLength={2}
                maxLength={40}
                />
              </label>
            <span 
              className="profile-form__error profile-form__error_type_name-input-error"
              id="profile-form-name-input-error">{errorName}
            </span>
          </div>
          
          <div className="profile-form__input-container">
            <label className="profile-form__input-label">E-mail
              <input 
                id="profile-form-email-input"
                className={`profile-form__input profile-form__input_email ${!errorEmail || "profile-form__input-error"}`}
                required
                type="email"
                name="profileInputEmail"
                placeholder="Введите email"
                value={email || ""}
                onChange={handleEmailChange}
                minLength={2}
                />
            </label>
            <span 
              className="profile-form__error profile-form__error_type_email-input-error"
              id="profile-form-email-input-error">{errorEmail}
            </span>
          </div>
          
        </fieldset>
        {isEdited ? (
            <button
              className={(errorEmail || errorName) ? "profile__save-button_no-active" : "profile__save-button"}
              type="submit"
              disabled={!formIsValid}>
              {props.renderLoading}
              </button>
          ) : (
            <>
              <button 
                className="profile__edit-button"
                type="button"
                onClick={handleEditProfile}
                >
                Редактировать
                </button>
              <button 
                className="profile__signout-button"
                type="button"
                onClick={props.signout}
                >
                Выйти из аккаунта
              </button> 
            </>
          )
        }
      </form>
    </div>
  )
}
export default Profile;
