import React from 'react';
import { Link, withRouter } from 'react-router-dom';
;


export function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');  

  function handleChangeEmai(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="login">
      <p className="login__title">
        Вход
        </p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input required id="email" name="email" placeholder="Email" type="email" value={email} onChange={handleChangeEmai} />
        <input required id="password" name="password" placeholder="Пароль" type="password" value={password} onChange={handleChangePassword} />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>
      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link onClick={props.updateHistory} to="/sign-up" className="login__signup-link">Регистрация</Link>
      </div>
    </div>
  )

}

export default withRouter(Login);