import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateAuthInput } from '../utils/validation';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validateAuthInput({ email, password });
        if (validationError) {
            setError(validationError);
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
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
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
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        required
                        minLength={8}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">
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