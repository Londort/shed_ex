import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.js';
import AddNew from './pages/AddNew/AddNew.js';
import SharePage from './pages/SharePage/SharePage.js';

function App() {
  const [schedules, setSchedules] = useState([]);

  const addSchedule = (newSchedule) => {
    setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home schedules={schedules} setSchedules={setSchedules} />}
          />
          <Route
            path="/add-new"
            element={<AddNew addSchedule={addSchedule} />}
          />
          <Route
            path="/share/:id"
            element={<SharePage schedules={schedules} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
