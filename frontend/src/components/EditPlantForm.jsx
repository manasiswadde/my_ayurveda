import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import './AddPlantForm.css';

const EditPlantForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState('');
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

  // Update preview URL when imageUrl changes
  useEffect(() => {
    if (formData.imageUrl) {
      setPreviewUrl(formData.imageUrl);
    }
  }, [formData.imageUrl]);

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

      // Ensure benefits and uses are always arrays with at least one empty item
      const benefits = Array.isArray(plant.benefits) && plant.benefits.length > 0 
        ? plant.benefits 
        : [''];
      
      const uses = Array.isArray(plant.uses) && plant.uses.length > 0 
        ? plant.uses 
        : [''];

      setFormData({
        name: plant.name || '',
        scientificName: plant.scientificName || '',
        description: plant.description || '',
        benefits,
        uses,
        category: plant.category || 'Herb',
        imageUrl: plant.imageUrl || ''
      });
      
      if (plant.imageUrl) {
        setPreviewUrl(plant.imageUrl);
      }
      
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
    if (formData[field].length <= 1) {
      // Keep at least one empty input
      setFormData({ ...formData, [field]: [''] });
      return;
    }
    
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleImageError = () => {
    setPreviewUrl('/placeholder-plant.jpg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Clean empty items from arrays before submission
    const cleanedFormData = {
      ...formData,
      benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
      uses: formData.uses.filter(use => use.trim() !== '')
    };

    // If benefits or uses would be empty after filtering, add at least one item
    if (cleanedFormData.benefits.length === 0) {
      cleanedFormData.benefits = [''];
    }
    
    if (cleanedFormData.uses.length === 0) {
      cleanedFormData.uses = [''];
    }

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
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading plant data...</p>
      </div>
    );
  }

  return (
    <div className="edit-plant-container">
      <div className="edit-plant-card">
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
              placeholder="Enter plant name"
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
              placeholder="Enter scientific name"
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
              placeholder="Enter plant description"
              required
            />
          </div>

          <div className="form-group">
            <label>Benefits</label>
            <div className="array-inputs">
              {formData.benefits.map((benefit, index) => (
                <div key={`benefit-${index}`} className="array-input">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayChange(index, 'benefits', e.target.value)}
                    placeholder="Enter benefit"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField('benefits', index)}
                    className="remove-btn"
                    aria-label="Remove benefit"
                  >
                    <span>×</span>
                  </button>
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
          </div>

          <div className="form-group">
            <label>Uses</label>
            <div className="array-inputs">
              {formData.uses.map((use, index) => (
                <div key={`use-${index}`} className="array-input">
                  <input
                    type="text"
                    value={use}
                    onChange={(e) => handleArrayChange(index, 'uses', e.target.value)}
                    placeholder="Enter use"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField('uses', index)}
                    className="remove-btn"
                    aria-label="Remove use"
                  >
                    <span>×</span>
                  </button>
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
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
            {previewUrl && (
              <div className="image-preview">
                <img 
                  src={previewUrl} 
                  alt={`Preview of ${formData.name}`} 
                  onError={handleImageError}
                />
              </div>
            )}
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Plant'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/admin/dashboard')} 
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlantForm;