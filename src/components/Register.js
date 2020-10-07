import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';


export function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useHistory();

    function handleChangeEmai(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        auth.register(password, email)
            .then(res => {
                if (res.data) {
                    props.handleLogin()
                    history.push('/');
                    props.onEndRegistration(true);
                    
                } else {
                    props.onEndRegistration(false)
                }
                
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="register">
            <p className="register__title">
                Регистрация
        </p>
            <form className="register__form" onSubmit={handleSubmit}>
                <input required id="email" name="email" placeholder="Email" type="email" value={email} onChange={handleChangeEmai} />
                <input required id="password" name="password" placeholder="Пароль" type="password" value={password} onChange={handleChangePassword} />
                <div className="register__button-container">
                    <button type="submit" className="register__link" onSubmit={handleSubmit}>Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signup">
                <p>Уже зарегистрированы?</p>
                <Link onClick={props.updateHistory} to="/sign-in" className="register__signup-link">Войти</Link>
            </div>
        </div>
    )
}


export default withRouter(Register);