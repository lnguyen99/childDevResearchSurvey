import React from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn'; 
import LogOut from './LogOut'; 

import { AuthConsumer } from '../AuthContext'

export default function Navbar() {
    return (
        <AuthConsumer>
            {({ isAuth, login, logout }) => (
            <nav className="navbar navbar-dark navbar-expand-lg" style={{"backgroundColor": "#800000"}}>
                <Link to="/" className="navbar-brand">Homepage</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        {isAuth ? (
                            <li className="navbar-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                        ) : (null)}
                        <li className="navbar-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/contact-us" className="nav-link">Contact Us</Link>
                        </li>
                        <li className="navbar-item">
                            {isAuth ? (<LogOut logout={logout} /> ) : (
                            <LogIn login={login}><div type='button' className="nav-link">Log In</div></LogIn>)}
                        </li>
                    </ul>
                </div>
            </nav>)}
        </AuthConsumer>
    );
}
