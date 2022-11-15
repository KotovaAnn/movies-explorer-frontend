import { useLocation } from 'react-router-dom';

function InfoTooltip(props) {
  const location = useLocation();
    return (
      <div className={`info-tooltip ${(props.isOpen) && "info-tooltip_opened"}`}>
        <div className="info-tooltip__content">
          <h2 className="info-tooltip__title">
            {
              (location.pathname === "/signup") ? (
                (props.registered) ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
              ) : (location.pathname === "/profile") ? (
                (props.isEditProfile) ? "Профиль успешно изменен!" : "Что-то пошло не так! Попробуйте ещё раз."
              ) : (location.pathname === "/signin") ? (
                (!props.loggedIn) && "Что-то пошло не так! Попробуйте ещё раз."
              ) : (location.pathname === "/movies" && props.registered) ? (
                "Вы успешно зарегистрировались!"
              ) : ('')
            }
            </h2>
          <button className="info-tooltip__close-btn" type="button" onClick={props.onClose}></button>
        </div>
      </div>
    )
  }
  
  export default InfoTooltip;