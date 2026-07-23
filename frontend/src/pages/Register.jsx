import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
                username,
                email: email.trim(),
                password,
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || 'Something went wrong. Please try a different username or email.');
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
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
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
                <button type="submit" className="form-button" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                    Register
                </button>
            </form>
            {error && <p className="form-error">{error}</p>}
            <p className="form-link-text">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;