import React from 'react';

import { useNavigate } from 'react-router-dom';
import '../Form/Form.css';

const FreelancerLogin = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/freelancer-signup');
  };

  return (
    <div className="form-container">
      <h1>Freelancer Login</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        {/* <button type="button" className="google-btn">Sign in with Google</button> */}
      </form>
      <p>
        Don't have an account? 
        <span onClick={handleNavigate} className="signup-link"> Sign up</span>
      </p>
    </div>
  );
}

export default FreelancerLogin;
