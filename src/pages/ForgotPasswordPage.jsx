import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is a simulation. A real app would call a backend API here.
    alert('If an account with this email exists, a password reset link has been sent.');
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p className="forgot-password-subtitle">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-reset">Send Reset Link</button>
        <p className="back-to-login">
          Remembered your password? <Link to="/login">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;