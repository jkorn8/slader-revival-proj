import './App.css';
import Home from './Home.js';
import Textbook from './components/Textbook.js'
import NotFound from './components/NotFound.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="TitleBar">
        <span>Test</span>
      </div>
    </div>
  );
}

export default App;
