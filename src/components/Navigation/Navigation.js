import { NavLink } from 'react-router-dom';
import BurgerButtonMenu from '../BurgerButtonMenu/BurgerButtonMenu';

function Navigation(props) {
  return (
    <div className="navigation">
      <ul className="navigation__links">
        <li><NavLink className="navigation__link" activeClassName="navigation__active-link" to="/movies">Фильмы</NavLink></li>
        <li><NavLink className="navigation__link" activeClassName="navigation__active-link" to="/saved-movies">Сохраненные фильмы</NavLink></li>
        <li><NavLink className="navigation__link navigation__link_type_overlay-gray" activeClassName="navigation__active-link_type_overlay-gray" to="/profile">Аккаунт</NavLink></li>
      </ul>
      <BurgerButtonMenu onOpenMenu={props.onOpenMenu} />
    </div>
  )
}

export default Navigation;