// Signup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';
import { Button } from '../components/Button';
import { UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../media/img_2.jpg'

const Signup = () => {
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setPassword('');
        setVerifyPassword('');
        setEmail('');
    }, [])

    const { setUser } = React.useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); //stop default refresh in React

        // Check if passwords match
        if (password !== verifyPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            password,
            email
        };

        try {
            console.log('Sending user info')
            const response = await axios.put('http://localhost:5000/user/create', user);
            console.log(response.data);
            setUser(user);
            alert(response.data);
            navigate('/');
            return;
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <>
        <img src = {Image}/> 
        <div className="signup-container">
            {/* <h1 className="main-signup-title">Sign Up</h1> */}
            <div className="signup-form">
                <h2 className="signup-title">Sign Up</h2>
                <div className="signup-input-field">
                    <input type="text" placeholder="Email address"
                    value = {email} onChange = {e => setEmail(e.target.value)}/>
                </div>
                <div className="signup-input-field">
                    <input type="password" placeholder="Create Password"
                     value = {password} onChange = {e => setPassword(e.target.value)}/>
                     
                </div>
                <div className="signup-input-field">
                    <input type="password" placeholder="Verify Password"
                    value = {verifyPassword} onChange = {e => setVerifyPassword(e.target.value)}/>
                </div>
                
                
                <div className="signup-buttons">
                    <Button
                        type='submit'
                        className='btns'
                        buttonStyle='btn--body'
                        buttonSize='btn--wide'
                        onClick={handleSubmit}
                    >Sign Up</Button>
                </div>
                <h3 className = 'login-text'>
                    Already have an account? <Link to='/log-in' className = 'signup-link'>Log In</Link>
                </h3>
            </div>
        </div>
        </>
    );
};

export default Signup;
