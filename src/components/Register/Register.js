import AuthForm from '../AuthForm/AuthForm';
import AuthFormLink from '../AuthFormLink/AuthFormLink';

function Register(props) {
  return (
    <div className="register">
      <AuthForm title="Добро пожаловать!" buttonName="Зарегистрироваться" handleAuth={props.handleRegistration} />
      <AuthFormLink answer="Уже зарегистрированы?" link="/signin" textLink="Войти" />
    </div>
  )
}

export default Register;