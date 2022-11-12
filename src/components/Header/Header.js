import { useLocation } from 'react-router-dom';
import LogoLink from '../LogoLink/LogoLink';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const location = useLocation();
  return (
    <header>
      {
        ((props.loggedIn) && (location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/profile")) ? (
          <div className="header__content">
            <LogoLink classLink="logolink "/>
            <Navigation onOpenMenu={props.onOpenMenu}/>
          </div>
        ) : (location.pathname === '/') ? (
          <div className="header__content">
            <LogoLink classLink="logolink "/>
            <AuthNavigation />
          </div>
        ) : (location.pathname === '/signin' || location.pathname === '/signup') ? (
          <div className="header__content-auth">
            <LogoLink classLink="logolink__auth"/>
          </div>
        ) : ('')
      }
    </header>
  );
};

export default Header;
