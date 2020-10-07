import { Link, Route, useHistory } from 'react-router-dom';
import React from 'react';

function InfoBar(props) {
    const history = useHistory();

    function signOut() {
        props.logOut();
        localStorage.removeItem('jwt');
        history.push('/');
    }

    return (
        <div className="infobar">
            {props.loggedIn ?
                <>
                    <p className="infobar__title">{`${props.userEmail}`}</p>
                    <Link onClick={signOut} to="/sign-in" className="infobar__button">Выйти</Link>
                </>
                : null
            }
            <Route path="/sign-in" >
                <Link to="/sign-up" className="infobar__button">Регистрация</Link>
            </Route>
            <Route path="/sign-up" >
                <Link to="/sign-in" className="infobar__button">Войти</Link>
            </Route>
        </div>
    )
}

export default InfoBar;