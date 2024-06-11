import React, { useState } from 'react'
import { TextField } from '@mui/material';

function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div style={{ 'height': '100%'}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center', height: '92vh' }}>
                <TextField style={{ width: '30vw', marginBottom: '2vh' }} id="outlined-basic" label="Email or Username" variant="outlined" value={id} onChange={(e) => setId(e.target.value)}/>
                <TextField style={{ width: '30vw' }} id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value) } type="password"/>
                <span style={{ alignText: 'left', width: '30vw', marginBottom: '2vh', marginTop: '0.5vh', color: 'blue'}}>Forgot Password?</span>
                <button style={{ width: '20vw', backgroundColor: '#369cfa', borderRadius: '90px', padding: '10px', border: 'none'}} onClick={(e) => console.log(id, password)}>
                    <span style={{ fontSize: '1.0rem', font: "Roboto" }}>
                        Sign In
                    </span>
                </button>
                <text style={{ marginTop: '2vh', color: 'blue'}}>Don't have an account? Sign Up</text>
            </div>
        </div>
    );
}

export default Login;
