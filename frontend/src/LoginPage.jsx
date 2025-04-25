import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const API_BASE_URL = "http://localhost:4040/api";
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { 
        email: formData.email, 
        password: formData.password 
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.data?.success) {
        // Store user data in localStorage or context if needed
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Show success toast
        toast.success(response.data.message || "Successfully logged in!");
        
        // Small delay to allow toast to be seen before redirect
        setTimeout(() => {
          // Redirect to dashboard or home page
          navigate('/feature');
        }, 500);
      } else {
        toast.error(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 
        (error.code === 'ERR_NETWORK' ? "Network error. Please check your connection." : "An error occurred. Please try again.");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page full-size">
      <div className="login-container">
        <h2>Welcome back</h2>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            name="email"
            placeholder="Email address" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            required 
            value={formData.password}
            onChange={handleChange}
          />
          <Link to="/forgot-password" className="forgot-password">Forgot your password?</Link>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;