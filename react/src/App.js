import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/LandingPage/LandingPage';
import Login from './pages/LoginPage/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
