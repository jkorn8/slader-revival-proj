import './App.css';
import { Route, Routes, Navigate, Link, BrowserRouter} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import TextbookPage from './pages/TextbookPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AnswerCreate from './pages/AnswerCreate';
import SearchPage from './pages/SearchPage';
import Solutions from './pages/Solutions';

// App Name Ideas: 
// - MathPath
// - MathWrath
// - OutNumbered
// - MathFix
// - BackOfTheBook
// - MathLib

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TitleBar />
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/login" element={ <Login/> }/>
          <Route path="/signup" element={ <Signup/> }/>
          <Route path="/account" element={ <Protected/> }/>
          <Route path="/search" element={ <SearchPage/> } />
          <Route path="/textbook/:textbookId" element={ <TextbookPage /> } />
          <Route path="/solutions/:textbookId/:chapter/:section/:problem" element={ <Solutions/> }/>
          <Route path="/create" element={ <AnswerCreate/> }/>
          <Route path="/*" element={<NotFound/>}  />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const TitleBar = () => {

  const { authState } = useAuth();

  return (
    <div className="TitleBar">
      <div style={{ width: '20%'}}>
        <Link to="/" style={{textDecoration: 'none', color: '#1013C5', marginLeft: '20px', fontFamily: 'Poppins, sans-serif', fontSize: '32px' }}>MathLib</Link>
      </div>
      <div style={{ width: '60%', display: 'flex', justifyContent: 'flex-start'}}>
        {/* <Search onSearch={(query: string) => {
          textbookSearch(query).then((textbooks: Textbook[]) => {
            setSearchResults(textbooks);
          });
        }} results={searchResults}/> */}
      </div>
      <div style={{ width: '20%', display: 'flex', justifyContent: 'right'}}>
        {authState && authState.authenticated ? 
        <Link to="/account" style={{marginRight: '10px', textDecoration: 'none', color: 'black' }}>
          <img src="userpfp.jpg" alt="Profile" style={{ height: '8vh', borderRadius: '90px' }}/>
        </Link>
        : <div>
            <Link to="/signup" className='authButton'>
              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '16px'}}>Sign Up</span>
            </Link>
            <Link to="/login" className='authButton'>
              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '16px'}}>Log In</span>
            </Link>
          </div>
          }
      </div>
    </div>
  )
}

const Protected = () => {

  const { authState, onLogout } = useAuth();

  if (!authState || authState.authenticated === null || authState.authenticated === false) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1>Protected Page!</h1>
      <h2>Token: {authState.token}</h2>
      <button onClick={() => onLogout!() }>Logout</button>
    </div>
  )
}

const NotFound: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center'}}>404 Page Not Found</h1>
    </div>
  );
};

export default App;
