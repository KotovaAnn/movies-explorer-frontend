function InfoTooltip(props) {
    return (
      <div className={`info-tooltip ${(props.isOpen) && "info-tooltip_opened"}`}>
        <div className="info-tooltip__content">
          <h2 className="info-tooltip__title">{(props.registered) ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
          <button className="info-tooltip__close-btn" type="button" onClick={props.onClose}></button>
        </div>
      </div>
    )
  }
  
  export default InfoTooltip;