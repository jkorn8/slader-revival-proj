import React, { useState } from 'react'
import { TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Signup() {
    const [ username, setUsername ] = useState(''); 
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const { authState, onRegister, onLogin } = useAuth();
    if (authState.authenticated) {
        return <Navigate to="/account" />;
    }

    return (
        <div style={{ 'height': '100%'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center', height: '92vh' }}>
                <TextField style={{ width: '30vw', marginBottom: '2vh' }} id="outlined-basic-username" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <TextField style={{ width: '30vw', marginBottom: '2vh' }} id="outlined-basic-email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <TextField style={{ width: '30vw', marginBottom: '2vh'}} id="outlined-basic-password" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value) } type="password"/>
                <button 
                    style={{ width: '20vw', backgroundColor: '#369cfa', borderRadius: '90px', padding: '10px', border: 'none'}} 
                    onClick={() => onRegister(username, email, password).then((res) => {
                        if (res.success) {
                            onLogin(email, password);
                        } else {
                            alert('Error creating user');
                        }
                    })}
                    >
                    <span style={{ fontSize: '1.0rem', font: "Roboto" }}>
                        Create Account
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Signup;
