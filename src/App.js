import './App.css';
import Home from './pages/Home.js';
import Textbook from './pages/Textbook.js'
import NotFound from './pages/NotFound.js';
import { Route, Routes, Navigate, Link} from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import AnswerCreate from './pages/AnswerCreate.js';

// App Name Ideas: 
// - MathPath
// - MathWrath
// - OutNumbered

const App = () => {
  return (
    <AuthProvider>
      <TitleBar />
      <Routes>
        <Route path="/" element={ <Home/> } />
        {/* should have a search element here as well */}
        <Route path="/textbook" element={ <Textbook/> } />
        <Route path="/signup" element={ <Signup/> }/>
        <Route path="/account" element={ <Protected/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/create" element={ <AnswerCreate/> }/>
        <Route element={<NotFound/>}  />
      </Routes>
    </AuthProvider>
  );
}

const TitleBar = () => {

  const { authState } = useAuth();

  return (
    <div className="TitleBar">
      <div style={{ width: '20%'}}>
        <Link to="/" style={{textDecoration: 'none', color: 'black', marginLeft: '10px'}}>LOGO</Link>
      </div>
      <div style={{ width: '80%', display: 'flex', justifyContent: 'right'}}>
        {authState.authenticated ? 
        <Link to="/account" style={{marginRight: '10px', textDecoration: 'none', color: 'black' }}>
          <img src="userpfp.jpg" alt="Profile" style={{ height: '8vh', borderRadius: '90px' }}/>
        </Link>
        : <Link to="/login" style={{marginRight: '10px', textDecoration: 'none', color: 'black' }}>
            <span>Sign In</span>
          </Link>}
      </div>
    </div>
  )
}

const Protected = () => {

  const { authState, onLogout } = useAuth();

  if (authState.authenticated === null || authState.authenticated === false) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1>Protected Page!</h1>
      <h2>Token: {authState.token}</h2>
      <button onClick={() => onLogout()}>Logout</button>
    </div>
  )
}

export default App;
