import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';


export function Login(props) {
  const email = React.useState('');
  const password = React.useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  function handleSubmit(e){
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          this.setState({ email: '', password: '' }, () => {
            this.props.history.push('/');
          })
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <p className="login__title">
        Вход
        </p>
      <form className="login__form">
        <input required id="email" name="email" placeholder="Email" type="email" />
        <input required id="password" name="password" placeholder="Пароль" type="password" />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>
      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="login__signup-link">Регистрация</Link>
      </div>
    </div>
  )

}

export default withRouter(Login);