import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.js';
import AddNew from './pages/AddNew/AddNew.js';

function App() {
  const [schedules, setSchedules] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-new" element={<AddNew />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
