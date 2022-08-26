import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/LandingPage/LandingPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
