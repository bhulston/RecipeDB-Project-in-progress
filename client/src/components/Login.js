import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Button } from './Button';
import { UserContext } from '../App'; //global user variable
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const { setUser } = React.useContext(UserContext);
    const history = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault(); //stop default refresh in React

        const user = {
            password,
            email
        };

        try {
            console.log('Sending user info')
            const response = await axios.post('http://localhost:5000/user/verify', {
                email: user.email,
                password: user.password
            })

            alert(response.data.message);
            console.log(response.data.message);
            
            if (response.data.verified) {
                setUser(user);
                history('/profile');
            } else {
                alert('Try again or sign up!');
            };
            
        } catch (error) {
            console.error(error);
        }
    };


    return (
      <form onSubmit = {handleLogin}>    
        <div className="login-container">
            <h1 className="main-login-title">Log In</h1>
            <div className="login-form">
                <h2 className="login-title">Log In to your HealthyRecipes account</h2>
                <div className="login-input-field">
                    <input type="password" placeholder="Create Password" 
                    value = {password} onChange = {e => setPassword(e.target.value)}/>
                </div>
                <div className="login-input-field">
                    <input type="text" placeholder="Email address" 
                    value = { email } onChange = {e => setEmail(e.target.value)}/>
                </div>
                <div className="login-buttons">
                    <Button
                        type = 'submit'
                        className='btns'
                        buttonStyle='btn--body'
                        buttonSize='btn--medium'
                        onClick={handleLogin}
                    >Log In</Button>
                    <Button
                        className='btns'
                        buttonStyle='btn--body'
                        buttonSize='btn--medium'
                        linkTo='/sign-up'
                    >Sign Up</Button>
                </div>
            </div>
        </div>
      </form>
    );
};

export default Login;
