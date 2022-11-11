import AuthForm from '../AuthForm/AuthForm';
import AuthFormLink from '../AuthFormLink/AuthFormLink';

function Login(props) {
  return (
    <div className="login">
      <AuthForm title="Рады видеть!" buttonName="Войти" handleAuth={props.handleLogin} />
      <AuthFormLink answer="Еще не зарегистрированы?" link="/signup" textLink="Регистрация" />
    </div>
  )
}

export default Login;