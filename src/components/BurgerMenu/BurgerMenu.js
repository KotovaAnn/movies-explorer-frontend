import { NavLink } from 'react-router-dom';

function BurgerMenu(props) {
  return (
    <div className={(props.isOpenMenu === true) ? "burger-menu_opened" : "burger-menu"}>
      <div className="burger-menu__navigation">
        <button className="burger-menu__close-button" type="button" onClick={props.onCloseMenu}/>
        <ul className="burger-menu__navigation-links">
          <li className="burger-menu__navigation-item"><NavLink className="burger-menu__navigation-link" to="/" onClick={props.onCloseMenu}>Главная</NavLink></li>
          <li className="burger-menu__navigation-item"><NavLink className="burger-menu__navigation-link burger-menu__navigation-link_active" to="/movies" onClick={props.onCloseMenu}>Фильмы</NavLink></li>
          <li className="burger-menu__navigation-item"><NavLink className="burger-menu__navigation-link" to="/saved-movies" onClick={props.onCloseMenu}>Сохраненные фильмы</NavLink></li>
          <li className="burger-menu__navigation-item"><NavLink className="burger-menu__navigation-link" to="/profile" onClick={props.onCloseMenu}>Аккаунт</NavLink></li>
        </ul>
      </div>
    </div>
  )
}
export default BurgerMenu;