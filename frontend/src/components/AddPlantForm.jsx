import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import './AddPlantForm.css';

const AddPlantForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    description: '',
    benefits: [''],
    uses: [''],
    category: 'Herb',
    imageUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);

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

    // Filter out empty strings from arrays
    const cleanedFormData = {
      ...formData,
      benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
      uses: formData.uses.filter(use => use.trim() !== '')
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:4040/api/admin/plants',
        cleanedFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Plant created successfully');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error creating plant:', error);
      toast.error(error.response?.data?.message || 'Failed to create plant');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-plant-form">
      <div className="form-container">
        <h2>Add New Plant</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Plant Name</label>
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
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
                  placeholder="Enter benefit"
                  required={index === 0}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('benefits', index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('benefits')}
              className="add-btn"
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
                  placeholder="Enter use"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('uses', index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('uses')}
              className="add-btn"
            >
              Add Use
            </button>
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
              <option value="Other">Other</option>
            </select>
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
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="button-group">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Plant'}
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

export default AddPlantForm; 