import MainTitle from '../MainTitle/MainTitle';

function Techs(props) {
  return(
    <section className="tech" id="technologies">
      <MainTitle title="Технологии"/>
      <div className="tech__content-block">
        <h3 className="tech__subtitle">7 технологий</h3>
        <p className="tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="tech__steck">
          <li className="tech__steck-item">HTML</li>
          <li className="tech__steck-item">CSS</li>
          <li className="tech__steck-item">JS</li>
          <li className="tech__steck-item">React</li>
          <li className="tech__steck-item">Git</li>
          <li className="tech__steck-item">Express.js</li>
          <li className="tech__steck-item">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;