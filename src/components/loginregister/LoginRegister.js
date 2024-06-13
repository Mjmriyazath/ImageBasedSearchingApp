import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [usernameRegister, setUsernameRegister] = useState('');
    const [email, setEmail] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/registrations', {
                username: usernameRegister,
                email: email,
                password: passwordRegister
            });
            alert('Registration successful');
            // Clear registration form fields after successful registration
            setUsernameRegister('');
            setEmail('');
            setPasswordRegister('');
        } catch (error) {
            console.error('Error registering user:', error.response.data.message);
            alert('Failed to register. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', {
                username: usernameLogin,
                password: passwordLogin
            });
            // If login is successful, display success message and optionally redirect user
            alert('Login successful');
            // Clear login form fields after successful login
            setUsernameLogin('');
            setPasswordLogin('');
        } catch (error) {
            console.error('Error logging in:', error.response.data.message);
            alert('Failed to login. Please check your credentials and try again.');
        }
    };

    return (
        <div className={`wrapper${action}`}>
            <div className='form-box login'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} required />
                        <FaLock className='icon' />
                    </div>
                    <div className='remember-forgot'>
                        <label>
                            <input type='checkbox' />Remember me
                        </label>
                        <a href='#'>Forgot password?</a>
                    </div>
                    <button type='submit'>Login</button>
                    <div className='register-link'>
                        <p>Don't have an account?<a href='#' onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className='form-box register'>
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' value={usernameRegister} onChange={(e) => setUsernameRegister(e.target.value)} required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)} required />
                        <FaLock className='icon' />
                    </div>
                    <div className='remember-forgot'>
                        <label>
                            <input type='checkbox' />I agree to the terms & conditions
                        </label>
                    </div>
                    <button type='submit'>Register</button>
                    <div className='register-link'>
                        <p>Already have an account?<a href='#' onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
