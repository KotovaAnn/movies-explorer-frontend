function NavTab() {
  const navigationTabs = [
    {
      title: 'О проекте',
      link: '#about-project',
      id: 1,
    },
    {
      title: 'Технологии',
      link: '#technologies',
      id: 2,
    },
    {
      title: 'Студент',
      link: '#student',
      id: 3,
    },
  ]
    
  const navTabsMarkup = navigationTabs.map((item) => (
    <li className='navigation-tab__list-item' key={item.id}>
      <a className='navigation-tab__list-link' href={item.link}>{item.title}</a>
    </li>
  ))

  return (
    <nav className="navigation-tab">
      <ul className="navigation-tab__list">{navTabsMarkup}</ul>
    </nav>
  )
}
export default NavTab;
