import React from 'react';
import {useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();
  
  function handleGoBackBtnClick() {
    history.goBack();
  };

  return (
    <main className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <button className="not-found__goback-btn" type="button" onClick={handleGoBackBtnClick}>Назад</button>
    </main>
  )
}
export default NotFound;