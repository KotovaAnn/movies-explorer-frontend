import { NavLink } from 'react-router-dom';

function AuthNavigation(props) {
  return(
    <nav className="authnavigation">
      <ul className="authnavigation__links">
        <li><NavLink className="authnavigation__link" to="/signup">Регистрация</NavLink></li>
        <li><NavLink className="authnavigation__link authnavigation__link_type_overlay-black" to="/signin">Войти</NavLink></li>
      </ul>
    </nav>
  )
}
export default AuthNavigation;