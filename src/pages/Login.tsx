import React, { useState } from 'react'
import { TextField } from '@mui/material';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    let navigate = useNavigate();

    const { authState, onLogin } = useAuth();
    if (authState?.authenticated) {
        return <Navigate to="/account" />;
    }

    return (
        <div style={{ 'height': '100%'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center', height: '92vh' }}>
                <TextField style={{ width: '30vw', marginBottom: '2vh' }} id="outlined-basic" label="Email or Username" variant="outlined" value={id} onChange={(e) => setId(e.target.value)}/>
                <TextField style={{ width: '30vw' }} id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value) } type="password"/>
                <span style={{ textAlign: 'left', width: '30vw', marginBottom: '2vh', marginTop: '0.5vh', color: 'blue'}}>Forgot Password?</span>
                <button style={{ width: '20vw', backgroundColor: '#369cfa', borderRadius: '90px', padding: '10px', border: 'none'}} onClick={() => onLogin!(id, password)}>
                    <span style={{ fontSize: '1.0rem', font: "Roboto" }}>
                        Sign In
                    </span>
                </button>
                <span style={{ marginTop: '2vh', color: 'blue'}} onClick={() => navigate('/signup')}>Don't have an account? Sign Up</span>
            </div>
        </div>
    );
}

export default Login;
