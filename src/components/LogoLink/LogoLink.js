import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';

function LogoLink(props) {
  return (
    <Link to="/">
       <img className={props.classLink} src={headerLogo} alt="Логотип" />
    </Link>
  )
}
export default LogoLink;