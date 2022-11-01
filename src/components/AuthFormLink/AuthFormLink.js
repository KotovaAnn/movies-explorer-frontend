import React from 'react';
import { Link } from 'react-router-dom';

function AuthFormLink(props) {
  return(
    <div className="auth-form-link">
      <p className="auth-form-link__answer">{props.answer}</p>
      <Link className="auth-form-link__link" to={props.link}>{props.textLink}</Link>
    </div>
  )
}
export default AuthFormLink;