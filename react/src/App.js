import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/LandingPage/LandingPage';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthorPage from './pages/AuthorPage/AuthorPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/author" element={<AuthorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
