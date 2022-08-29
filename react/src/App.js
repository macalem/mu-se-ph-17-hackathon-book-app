import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/LandingPage/LandingPage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthorPage from "./pages/AuthorPage/AuthorPage";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import ROLES from "./const/roles";
import "./App.css";
import UnauthorizedLogin from "./components/UnauthorizedLogin/UnauthorizedLogin";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* public routes */}
          <Route exact path="/" element={<Home />} />

          <Route element={<UnauthorizedLogin />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/author" element={<AuthorPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
