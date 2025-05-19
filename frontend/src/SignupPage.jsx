import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import { toast } from 'sonner';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const API_BASE_URL = "http://localhost:4040/api";
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password
      };
      
      console.log('Sending registration request:', { ...payload, password: '***' });
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.data?.success) {
        // Show success toast
        toast.success(response.data.message || "Account created successfully!");
        
        // Small delay to allow toast to be seen before redirect
        setTimeout(() => {
          // Redirect to login page after successful registration
          navigate('/login');
        }, 500);
      } else {
        toast.error(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
        (error.code === 'ERR_NETWORK' ? "Network error. Please check your connection." : "An error occurred. Please try again.");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page full-size">
      <div className="signup-container">
        <h2>Create your account</h2>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
        <form onSubmit={handleRegistration}>
          <input 
            type="text" 
            name="fullname"
            placeholder="Full Name" 
            required 
            value={formData.fullname} 
            onChange={handleChange} 
          />
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
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password" 
            required 
            value={formData.confirmPassword} 
            onChange={handleChange} 
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;