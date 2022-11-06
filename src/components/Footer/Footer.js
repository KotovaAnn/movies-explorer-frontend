import React from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  return(
    <>
      {
        (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') ? (
          <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х&#160;BeatFilm.</h2>
            <div className="footer__content">
              <p className="footer__copyright">&copy; 2022</p>
              <ul className="footer__links">
                <li className="footer__link-item"><a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                <li className="footer__link-item"><a className="footer__link" href="https://github.com/KotovaAnn" target="_blank" rel="noreferrer">Github</a></li>
              </ul>
            </div>
          </footer>
        ) : ('')
      }
    </>
  )
}
export default Footer;
