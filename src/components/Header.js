import React from 'react';
import headerLogo from '../images/header__logo.svg';
import InfoBar from './InfoBar'

function Header(props) {

    return (
        <header className="header">
            <img className="header__logo" alt="mesto-russia" src={headerLogo}></img>
            <InfoBar logOut={props.logOut} loggedIn={props.loggedIn} userEmail={props.userEmail} />
        </header>
    );
}

export default Header;