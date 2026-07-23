import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(Context);
    const navigate = useNavigate();

    const validate = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.trim())) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validate()) {
            return;
        }

        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                email: email.trim(),
                password,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate('/');
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            setError(err.response?.data || "Wrong credentials. Please try again.");
            console.error(err);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError('');
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password (min 8 chars)..."
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        minLength={8}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">
                    Login
                </button>
            </form>
            {error && <p className="form-error">{error}</p>}
            <p className="form-link-text">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;