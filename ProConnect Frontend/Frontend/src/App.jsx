import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ClientLogin from './components/ClientLogin/ClientLogin';
import FreelancerLogin from './components/FreelancerLogin/FreelancerLogin';
import ClientSignup from './components/ClientSignup/ClientSignup';
import FreelancerSignup from './components/FreelancerSignup/FreelancerSignup';
import LoginSelection from './components/LoginSelection/LoginSelection';

import Navbar from './components/Navbar/Navbar';
import './App.css';
import ClientDashboard from './components/Client-Dashboard/Client-Dashboard';
import FreelancerDashboard from './components/FreelancerDashboard/FreelancerDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login-selection" element={<LoginSelection />} />
          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/freelancer-login" element={<FreelancerLogin />} />
          <Route path="/client-signup" element={<ClientSignup />} />
          <Route path="/freelancer-signup" element={<FreelancerSignup />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
