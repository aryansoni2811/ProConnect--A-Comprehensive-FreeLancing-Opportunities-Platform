import React from 'react';

import { useNavigate } from 'react-router-dom';
import '../Form/Form.css';

const ClientLogin = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/client-signup');
  };

  return (
    <div className="form-container">
      <h1>Client Login</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <button type="button" className="google-btn">Sign in with Google</button>
      </form>
      <p>
        Don't have an account? 
        <span onClick={handleNavigate} className="signup-link"> Sign up</span>
      </p>
    </div>
  );
}

export default ClientLogin;
