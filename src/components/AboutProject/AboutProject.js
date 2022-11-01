import React from 'react';
import MainTitle from '../MainTitle/MainTitle';

function AboutProject(props) {

 return (  
    <section className="aboute-project" id="about-project">
      <MainTitle title="О проекте"/>
      <div className="aboute-project__dedline-block">
      <div className="aboute-project__block-content">
        <h3 className="aboute-project__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="aboute-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="aboute-project__block-content">
        <h3 className="aboute-project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="aboute-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="aboute-project__chart">
        <div className="aboute-project__chart-block aboute-project__chart-block_black">1 неделя</div>
        <div className="aboute-project__chart-block aboute-project__chart-block_gray">4 недели</div>
        <div className="aboute-project__chart-block aboute-project__chart-block_description">Back-end</div>
        <div className="aboute-project__chart-block aboute-project__chart-block_description">Front-end</div>
      </div>
    </div>
  </section>
  )
}
export default AboutProject;
