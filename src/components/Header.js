import React from 'react';
import './Header.css';
import Logo from '../img/logo.png';
import User from '../img/user.png'

export default ({black}) => {
    return(
        <>
            <header className={black ? "black" : ""}>
                <div className="header--logo">
                    <a href="/">
                        <img src={Logo} alt="Netflix" />
                    </a>
                </div>
                <div className="header--user">
                    <a href="/">
                        <img src={User} alt="Usuário" />
                    </a>
                </div>
            </header>
        </>
    )
}