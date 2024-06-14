import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/registrations', {
                username: username,
                email: email,
                password: password
            });
            alert('Registration successful');
            // Optionally, you can redirect the user to the login page here
        } catch (error) {
            console.error('Error registering user:', error.response.data.message);
            alert('Failed to register. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Make a request to your backend to verify the login credentials
            const response = await axios.get('http://localhost:5000/registrations', {
                username: username,
                password: password
            });
            // If login is successful, display success message and reset form
            setLoginSuccess(true);
            setUsername('');
            setPassword('');
            alert('Login successful');
            // Optionally, you can redirect the user to a dashboard page here
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
                        <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                        <p>Don't have an account?<a href='#' onClick={registerLink} >Register</a></p>
                    </div>
                </form>
            </div>

            <div className='form-box register'>
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
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
