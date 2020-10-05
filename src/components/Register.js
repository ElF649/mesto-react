import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';


export function Register(props) {
    const email = React.useState('');
    const password = React.useState('');
    

    function handleChange (e)  {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    function handleSubmit (e) {
        e.preventDefault();
        auth.register(password, email);        
    }

    return (
        <div className="register">
            <p className="register__title">
                Регистрация
        </p>
            <form className="register__form">
                <input required id="email" name="email" placeholder="Email" type="email" onChange={handleChange} />
                <input required id="password" name="password" placeholder="Пароль" type="password" onChange={handleChange} />
                <div className="register__button-container">
                    <button type="submit" className="register__link" onSubmit={handleSubmit}>Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signup">
                <p>Уже зарегистрированы?</p>
                <Link to="/login" className="register__signup-link">Войти</Link>
            </div>
        </div>
    )
}


export default withRouter(Register);