import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const API_BASE_URL = "http://localhost:4040";
      const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { 
        email 
      });

      if (response.data?.success) {
        setIsEmailSent(true);
        toast.success("Password reset instructions have been sent to your email!");
      } else {
        toast.error(response.data?.message || "Failed to process request");
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMessage = error.response?.data?.message || 
        (error.code === 'ERR_NETWORK' ? "Network error. Please check your connection." : "An error occurred. Please try again.");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="forgot-password-page full-size">
        <div className="forgot-password-container">
          <h2>Email Sent!</h2>
          <div className="success-message">
            <p>We've sent password reset instructions to:</p>
            <p className="email-sent">{email}</p>
            <p>Please check your email and follow the instructions to reset your password.</p>
            <p className="note">Note: The reset link will expire in 1 hour for security reasons.</p>
          </div>
          <Link to="/login" className="back-link">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page full-size">
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        <p>Enter your email address and we'll send you instructions to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <Link to="/login" className="back-link">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 