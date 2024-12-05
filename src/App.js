import React, { Component } from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Importing components for routing
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import ChangePassword from "./components/forgot/ChangePassword";
import ApplicationPage from "./components/Application/ApplicationPage";
import UserHome from "./components/userHome/UserHome";
import ApplicationDetail from "./components/Application/ApplicationDetail";
import UnAuthorized from "./components/Other/UnAuthorized";
import NotFound from "./components/Other/NotFound";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import Admin from "./components/admin/Admin";
import ForgotPassword from './components/forgot/ForgotPassword'
import ResetPassword from "./components/forgot/ResetPassword "
import HomePage from "./components/HomePage";

class App extends Component {

  render() {
    return (
      <Router>
        <Routes>
          {/* Routes for authentication and user functionality */}
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ChangePassword />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<UserRoute><UserHome /></UserRoute>} />
          <Route path="/application" element={<UserRoute><ApplicationPage /></UserRoute>} />
          <Route path="/applicationDetail/:tinNumber" element={<UserRoute><ApplicationDetail /></UserRoute>} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
