import Arrow from '../../images/arrow.svg';

function Portfolio() {
  const portfolioLinks = [
    {
      id: 1,
      name: 'Статичный сайт',
      link: 'https://github.com/KotovaAnn/how-to-learn',
    },
    {
      id: 2,
      name: 'Адаптивный сайт',
      link: 'https://github.com/KotovaAnn/russian-travel',
    },
    {
      id: 3,
      name: 'Одностраничное приложение',
      link: 'https://github.com/KotovaAnn/react-mesto-api-full',
    },
  ]

  const portfolioLinksMarkup = portfolioLinks.map((item) => (
    <li className="Portfolio__link-item" key={item.id}>
      <a className="Portfolio__link" href={item.link} target="_blank" rel="noreferrer">
        {item.name}
        <img className="Portfolio__link-arrow" src={Arrow} alt="Стрелка" /> 
      </a>
    </li>
  ))

  return(
    <section className="Portfolio">
      <h2 className="Portfolio__title">Портфолио</h2>
      <ul className="Portfolio__links">{portfolioLinksMarkup}</ul>
    </section>

  )
}
export default Portfolio;