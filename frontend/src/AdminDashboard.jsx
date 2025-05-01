import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/login');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const API_BASE_URL = "http://localhost:4040/api";
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Authentication required');
        navigate('/login');
        return;
      }
      
      // Fetch users
      const usersResponse = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(usersResponse.data);

      // Fetch plants
      const plantsResponse = await axios.get(`${API_BASE_URL}/admin/plants`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPlants(plantsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/login');
      } else {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const API_BASE_URL = "http://localhost:4040/api";
      await axios.delete(`${API_BASE_URL}/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('User deleted successfully');
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleDeletePlant = async (plantId) => {
    if (!window.confirm('Are you sure you want to delete this plant?')) return;

    try {
      const API_BASE_URL = "http://localhost:4040/api";
      await axios.delete(`${API_BASE_URL}/admin/plants/${plantId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Plant deleted successfully');
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error deleting plant:', error);
      toast.error('Failed to delete plant');
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const API_BASE_URL = "http://localhost:4040/api";
      const response = await axios.patch(
        `${API_BASE_URL}/auth/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        toast.success('User role updated successfully');
        fetchData(); // Refresh the data
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={activeTab === 'plants' ? 'active' : ''} 
            onClick={() => setActiveTab('plants')}
          >
            Plants
          </button>
        </nav>
      </header>

      <main className="dashboard-content">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : activeTab === 'users' ? (
          <div className="users-section">
            <div className="section-header">
              <h2>Users Management</h2>
              <button onClick={() => navigate('/admin/users/add')} className="add-button">
                Add New User
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>
                        <select 
                          value={user.role} 
                          onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                          className="role-select"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="actions">
                        <button onClick={() => navigate(`/admin/users/edit/${user._id}`)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteUser(user._id)} className="delete">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="plants-section">
            <div className="section-header">
              <h2>Plants Management</h2>
              <button onClick={() => navigate('/admin/plants/add')} className="add-button">
                Add New Plant
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map(plant => (
                    <tr key={plant._id}>
                      <td>{plant.name}</td>
                      <td className="description-cell">
                        <div className="truncate-text">{plant.description}</div>
                      </td>
                      <td className="actions">
                        <button onClick={() => navigate(`/admin/plants/edit/${plant._id}`)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeletePlant(plant._id)} className="delete">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 