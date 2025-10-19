import './Login.css';
import React, { useState } from 'react'
import { TextField } from '@mui/material';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    let navigate = useNavigate();

    const { authState, onLogin } = useAuth();
    if (authState?.authenticated) {
        return <Navigate to="/account" />;
    }

    const handleLogin = async () => {
        setError('');
        try {
            await onLogin!(id, password);
        } catch (err) {
            const response: number = (err as any).response?.status;
            if (response === 500 || response === 501 || response === 502 || response === 503) {
                setError('Server error. Please try again later.');
            }
            else if (response === 401 || response === 403) {
                setError('Invalid username or password.');
            }
            else if (response === 404 || response === 400) {
                setError('Please enter both a username and password.');
            }
            else if (response === undefined) {
                setError('Network error. Please check your connection and try again.');
            }
            else {
                setError('We\'re not quite sure what went wrong. Sorry about that! Please try again.');
            }
        }
    };

    return (
        <div className='loginContainer'>
            <div className='leftColumn'>
                <h1 className='logoText'>MathLib</h1>
            </div>
            <div className='rightColumn'>
                <div style={{width: '30vw', marginBottom: '5px'}}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold'}}>Log in to your account</span>
                </div>
                <TextField 
                    sx={{ width: '30vw', marginBottom: '2vh' }} 
                    id="outlined-basic" label="Username or Email" 
                    variant="outlined" 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    inputProps={{style: {fontFamily: 'Poppins, sans-serif'}}}
                    InputLabelProps={{style: {fontFamily: 'Poppins, sans-serif'}}}/>
                <TextField 
                    sx={{ width: '30vw', fontFamily: 'Poppins, sans-serif' }} 
                    id="outlined-basic" label="Password" variant="outlined" 
                    value={password} onChange={(e) => setPassword(e.target.value) } 
                    type="password"
                    inputProps={{style: {fontFamily: 'Poppins, sans-serif'}}}
                    InputLabelProps={{style: {fontFamily: 'Poppins, sans-serif'}}}/>
                <span className='clickableText' style={{width: '30vw', marginBottom: '20px'}}>Forgot Password?</span>
                {error && <div className='errorContainer'>{error}</div>}
                <button className='loginButton' onClick={handleLogin}>
                    <span>
                        Log In
                    </span>
                </button>
                <div className='signUpTextContainer'>
                    <span>Don't have an account?</span>&nbsp;<span className='clickableText' onClick={() => navigate('/signup')}>Sign Up</span>
                </div>
            </div>
        </div>
    );
}

export default Login;
