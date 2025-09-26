import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Developer from './pages/developer.js';
import Investor from './pages/investor.js';
import HomePage from './pages/homePage.js';
import ProfilePage from './pages/profilePage.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element= {<HomePage />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/investor" element={<Investor />} />
        <Route path="/profile" element= {<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
