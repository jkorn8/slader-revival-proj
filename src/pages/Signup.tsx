import './Signup.css';
import React, { useState } from 'react'
import { TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [ username, setUsername ] = useState<string>(''); 
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const { authState, onRegister, onLogin } = useAuth();
    let navigate = useNavigate();

    if (authState?.authenticated) {
        return <Navigate to="/account" />;
    }

    const handleSignUp = async () => {
        const response = await onRegister!(username, email, password)
        if (response.success) onLogin!(email, password);
        else alert('Error creating user');
    }

    return (
        <div className='signUpContainer'>
            <div className='leftColumn'>
                <h1 className='logoText'>MathLib</h1>
            </div>
            <div className='rightColumn'>
                <div style={{width: '30vw', marginBottom: '5px'}}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold'}}>Sign up for an account</span>
                </div>
                <TextField 
                    style={{ width: '30vw', marginBottom: '2vh' }} 
                    id="outlined-basic-username" 
                    label="Username" 
                    variant="outlined" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    inputProps={{style: {fontFamily: 'Poppins, sans-serif'}}}
                    InputLabelProps={{style: {fontFamily: 'Poppins, sans-serif'}}}/>
                <TextField 
                    style={{ width: '30vw', marginBottom: '2vh' }} 
                    id="outlined-basic-email" 
                    label="Email" 
                    variant="outlined" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{style: {fontFamily: 'Poppins, sans-serif'}}}
                    InputLabelProps={{style: {fontFamily: 'Poppins, sans-serif'}}}/>
                <TextField 
                    style={{ width: '30vw', marginBottom: '2vh'}} 
                    id="outlined-basic-password" 
                    label="Password" variant="outlined" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value) } 
                    type="password"
                    inputProps={{style: {fontFamily: 'Poppins, sans-serif'}}}
                    InputLabelProps={{style: {fontFamily: 'Poppins, sans-serif'}}}/>
                <button className='signUpButton' onClick={handleSignUp}>
                    <span className='signUp'>
                        Create Account
                    </span>
                </button>
                <div className='logInTextContainer'>
                    <span>Already have an account?</span>&nbsp;<span className='clickableText' onClick={() => navigate('/login')}>Log In</span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
