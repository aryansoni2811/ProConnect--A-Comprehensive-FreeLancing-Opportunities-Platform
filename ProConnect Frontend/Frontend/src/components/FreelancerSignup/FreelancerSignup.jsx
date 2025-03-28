import React from 'react';

import { useNavigate } from 'react-router-dom';
import '../Form/Form.css';

const FreelancerSignup = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/freelancer-login');
  };

  return (
    <div className="form-container">
      <h1>Freelancer Signup</h1>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
        <button type="button" className="google-btn">Sign up with Google</button>
      </form>
      <p>
        Already have an account? 
        <span onClick={handleNavigate} className="login-link"> Login</span>
      </p>
    </div>
  );
}

export default FreelancerSignup;
