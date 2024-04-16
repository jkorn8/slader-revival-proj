import './App.css';
import Home from './Home.js';
import Textbook from './components/Textbook.js'
import NotFound from './components/NotFound.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  //const navigation = useNavigate();

  return (
    <div className="App">
      <div className="TitleBar">
        <span>Test</span>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* should have a search element here as well */}
          <Route path="/textbook" element={<Textbook/>} />
          <Route element={<NotFound/>}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
