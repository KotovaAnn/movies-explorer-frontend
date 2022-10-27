import React from 'react';
import MainTitle from '../MainTitle/MainTitle';
import Student from '../../images/student.jpg';

function AboutMe(props) {
  return(
    <section className="about-me" id="student">
      <MainTitle title="Студент"/>
      <div className="about-me__content-block">
        <img className="about-me__img" src={Student} alt="Студент" />
        <h3 className="about-me__subtitle">Анна</h3>
        <p className="about-me__description">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__text">Родилась и живу в Санкт-Петербурге. Закончила Тверской государственный университет по специальности связи с общественностью. Работаю и учусь. Есть маленький сын. очень люблю кодить.</p>
        <ul className="about-me__links">
          <li className="about-me__links-item"><a className="about-me__link" href="https://vk.com/toksy">VK</a></li>
          <li className="about-me__links-item"><a className="about-me__link" href="https://github.com/KotovaAnn">GitHub</a></li>
        </ul>
      </div>
    </section>
  )
}
export default AboutMe;
