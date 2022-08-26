import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/LandingPage/LandingPage';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import './App.css';
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
