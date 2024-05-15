import './App.css';
import Home from './Home.js';
import Textbook from './components/Textbook.js'
import NotFound from './components/NotFound.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExerciseSelect from './components/ExerciseSelect.js';

function App() {
  //const navigation = useNavigate();

  return (
    // <div className="App">
    //   <div className="TitleBar">
    //     <span>Test</span>
    //   </div>
    //   <ExerciseSelect/>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<Home/>} />
    //       {/* should have a search element here as well */}
    //       <Route path="/textbook" element={<Textbook/>} />
    //       <Route element={<NotFound/>}  />
    //     </Routes>
    //   </Router>
    // </div>
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{padding: '1rem'}}>
        <div style={{padding: '1rem', borderRadius: '0.5rem', backgroundColor: '#066cfa' }}>
          <ExerciseSelect/>
          <div>Test</div>
        </div>
      </div>
    </div>
  );
}

export default App;
