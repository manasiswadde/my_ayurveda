import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import './AddPlantForm.css'; // Reusing the same CSS

const EditPlantForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    description: '',
    benefits: [''],
    uses: [''],
    category: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchPlantData();
  }, [id]);

  const fetchPlantData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:4040/api/admin/plants/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const plant = response.data.plant || response.data;
      
      if (!plant) {
        console.error('No plant data received:', response.data);
        toast.error('Failed to fetch plant data');
        navigate('/admin/dashboard');
        return;
      }

      setFormData({
        name: plant.name || '',
        scientificName: plant.scientificName || '',
        description: plant.description || '',
        benefits: Array.isArray(plant.benefits) ? plant.benefits : [''],
        uses: Array.isArray(plant.uses) ? plant.uses : [''],
        category: plant.category || 'Herb',
        imageUrl: plant.imageUrl || ''
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching plant:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to fetch plant data');
      navigate('/admin/dashboard');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const cleanedFormData = {
      ...formData,
      benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
      uses: formData.uses.filter(use => use.trim() !== '')
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:4040/api/admin/plants/${id}`,
        cleanedFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success || response.status === 200) {
        toast.success('Plant updated successfully');
        navigate('/admin/dashboard');
      } else {
        throw new Error(response.data.message || 'Failed to update plant');
      }
    } catch (error) {
      console.error('Error updating plant:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to update plant');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="form-container">
      <div className="form-content">
        <h2>Edit Plant</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="scientificName">Scientific Name</label>
            <input
              type="text"
              id="scientificName"
              name="scientificName"
              value={formData.scientificName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Herb">Herb</option>
              <option value="Shrub">Shrub</option>
              <option value="Tree">Tree</option>
              <option value="Climber">Climber</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Benefits</label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="array-input">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange(index, 'benefits', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('benefits', index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('benefits')}
              className="add-button"
            >
              Add Benefit
            </button>
          </div>

          <div className="form-group">
            <label>Uses</label>
            {formData.uses.map((use, index) => (
              <div key={index} className="array-input">
                <input
                  type="text"
                  value={use}
                  onChange={(e) => handleArrayChange(index, 'uses', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('uses', index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('uses')}
              className="add-button"
            >
              Add Use
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Plant'}
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

export default EditPlantForm; 