import './Signup.css';
import React, { useState } from 'react'
import { TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [ username, setUsername ] = useState<string>(''); 
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const [ error, setError ] = useState<string>('');

    const { authState, onRegister, onLogin } = useAuth();
    let navigate = useNavigate();

    if (authState?.authenticated) {
        return <Navigate to="/account" />;
    }

    const handleSignUp = async () => {
        setError('');
        const response = await onRegister!(username, email, password);
        if (response.success) onLogin!(email, password);
        else {
            const statusCode: number = (response as any)?.status;
            if (statusCode === 500 || statusCode === 501 || statusCode === 502 || statusCode === 503) {
                setError('Server error. Please try again later.');
            }
            else if (statusCode === 401 || statusCode === 403) {
                setError('Invalid username or email.');
            }
            else if (statusCode === 404 || statusCode === 400) {
                setError('Please enter all required fields.');
            }
            else if (statusCode === undefined) {
                setError('Network error. Please check your connection and try again.');
            }
            else {
                setError('We\'re not quite sure what went wrong. Sorry about that! Please try again.');
            }
        }
    };

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
                {error && <div className='errorContainer'>{error}</div>}
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
