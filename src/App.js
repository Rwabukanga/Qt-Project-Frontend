import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./forms/RegistrationForm"; // Import the form from the forms folder
import LoginForm from "./forms/LoginForm";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import UrlAnalytics from "./pages/UrlAnalytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/shorten" element={<UrlShortenerPage />} />
        <Route path="/anal" element={<UrlAnalytics />} />

      </Routes>
    </Router>
  );
}

export default App;
