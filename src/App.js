import './App.css';
import Home from './Home.js';
import Textbook from './components/Textbook.js'
import NotFound from './components/NotFound.js';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

const App = () => {
  return (
    <Router className='container'>
      <TitleBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* should have a search element here as well */}
        <Route path="/textbook" element={<Textbook/>} />
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
        <span style={{marginRight: '10px'}}>User Profile</span>
      </div>
    </div>
  )
}

export default App;
