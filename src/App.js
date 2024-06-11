import './App.css';
import Home from './pages/Home.js';
import Textbook from './pages/Textbook.js'
import NotFound from './pages/NotFound.js';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from './pages/Login.js';

const App = () => {
  return (
    <Router className='container'>
      <TitleBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* should have a search element here as well */}
        <Route path="/textbook" element={<Textbook/>} />
        <Route path="/login" element={<Login/>} />
        <Route element={<NotFound/>}  />
      </Routes>
    </Router>
  );
}

const TitleBar = () => {
  return (
    <div className="TitleBar">
      <div style={{ width: '20%'}}>
        <Link to="/" style={{textDecoration: 'none', color: 'black', marginLeft: '10px'}}>LOGO</Link>
      </div>
      <div style={{ width: '80%', display: 'flex', justifyContent: 'right'}}>
        <Link to="/login" style={{marginRight: '10px', textDecoration: 'none', color: 'black' }}>
          <img src="userpfp.jpg" alt="Profile" style={{ height: '8vh' }}/>
        </Link>
      </div>
    </div>
  )
}

export default App;
