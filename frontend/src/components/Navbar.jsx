// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

const Navbar = () => {
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="navbar-logo">TravelJournal</Link>
            </div>
            <div>
                <ul className="navbar-list">
                    <li><Link to="/">HOME</Link></li>
                    {user && ( // Show these links only if user is logged in
                        <>
                            <li><Link to="/myposts">MY POSTS</Link></li>
                            <li><Link to="/create">CREATE</Link></li>
                        </>
                    )}
                </ul>
            </div>
            <div>
                {user ? (
                    <ul className="navbar-list">
                        <li><span className="navbar-welcome">Welcome, {user.username}!</span></li>
                        <li onClick={handleLogout}><span style={{ cursor: 'pointer' }}>LOGOUT</span></li>
                    </ul>
                ) : (
                    <ul className="navbar-list">
                        <li><Link to="/login">LOGIN</Link></li>
                        <li><Link to="/register">REGISTER</Link></li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;