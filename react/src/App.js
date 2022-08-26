import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/LandingPage/LandingPage';
import './App.css';
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
