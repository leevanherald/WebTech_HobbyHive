import React, { useState, useRef } from 'react';
import './feedbackPage.css'; // optional styling
import { toast } from 'react-toastify';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hobby: '',
    region: '',
    description: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const regions = ['North', 'South', 'East', 'West', 'Central'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleClearImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    fileInputRef.current.value = null;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Enter a valid 10-digit number';
    if (!formData.hobby.trim()) newErrors.hobby = 'Hobby name is required';
    if (!formData.region) newErrors.region = 'Please select a region';
    if (formData.description.trim().length < 30) newErrors.description = 'Description must be at least 30 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success('Feedback submitted successfully!');
      setFormData({ name: '', phone: '', hobby: '', region: '', description: '', image: null });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="feedback-container">
      <h2>Suggest a New Hobby</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input name="name" value={formData.name} onChange={handleInputChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input name="phone" value={formData.phone} onChange={handleInputChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label>Hobby Name</label>
          <input name="hobby" value={formData.hobby} onChange={handleInputChange} />
          {errors.hobby && <p className="error">{errors.hobby}</p>}
        </div>

        <div className="form-group">
          <label>Region</label>
          <select name="region" value={formData.region} onChange={handleInputChange}>
            <option value="">Select Region</option>
            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
          </select>
          {errors.region && <p className="error">{errors.region}</p>}
        </div>

        <div className="form-group">
          <label>Description (min 30 characters)</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" />
          <small>{formData.description.length} / 500</small>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label>Upload an Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" />
              <button type="button" onClick={handleClearImage}>Remove Image</button>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Suggestion'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
