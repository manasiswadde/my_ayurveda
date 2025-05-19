import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import './components/AddUserForm.css';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    role: 'user',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4040/api/admin/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFormData({
          fullname: response.data.fullname || '',
          email: response.data.email || '',
          role: response.data.role || 'user',
        });
      } catch (error) {
        toast.error('Failed to fetch user data');
        navigate('/admin/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:4040/api/admin/users/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        toast.success('User updated successfully');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="add-user-form"><div className="form-container"><div>Loading...</div></div></div>;
  }

  return (
    <div className="add-user-form">
      <div className="form-container">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate('/admin/dashboard')} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
