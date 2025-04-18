import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import NavigationBar from './NavigationBar';
import { FiUser, FiPhone, FiStar, FiMapPin, FiFileText, FiImage, FiUpload, FiX } from 'react-icons/fi';

const FeedbackPage = ({ toggleChatbot, isChatbotVisible }) => {
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

    // Create FormData to send as a multipart form request (for the image and other data)
    const feedbackFormData = new FormData();
    feedbackFormData.append('name', formData.name);
    feedbackFormData.append('phone', formData.phone);
    feedbackFormData.append('hobby', formData.hobby);
    feedbackFormData.append('region', formData.region);
    feedbackFormData.append('description', formData.description);

    if (formData.image) {
      const imageFile = fileInputRef.current.files[0];
      feedbackFormData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:3005/submit-feedback', {
        method: 'POST',
        body: feedbackFormData,
      });
      if (!response.ok) throw new Error('Failed to submit feedback');
      toast.success('Feedback submitted successfully!');
      setFormData({ name: '', phone: '', hobby: '', region: '', description: '', image: null });
    } catch (error) {
      toast.error('Error submitting feedback');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      
      <div className="container mx-auto px-4 py-12 mt-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 py-6 px-8">
            <h2 className="text-3xl font-bold text-white">Suggest a New Hobby</h2>
            <p className="text-yellow-100 mt-2">
              Share your hobby ideas with the HobbyHive community
            </p>
          </div>
          
          {/* Form */}
          <form className="p-6 md:p-8 space-y-6" onSubmit={handleSubmit}>
            {/* Name field */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2" htmlFor="name">
                <FiUser className="mr-2 text-yellow-500" />
                Your Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Phone field */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2" htmlFor="phone">
                <FiPhone className="mr-2 text-yellow-500" />
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200`}
                placeholder="Enter 10-digit phone number"
              />
              {errors.phone && (
                <p className="text-red-500 mt-1 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Two column layout for smaller fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hobby field */}
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2" htmlFor="hobby">
                  <FiStar className="mr-2 text-yellow-500" />
                  Hobby Name
                </label>
                <input
                  id="hobby"
                  name="hobby"
                  value={formData.hobby}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.hobby ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200`}
                  placeholder="Name of the hobby"
                />
                {errors.hobby && (
                  <p className="text-red-500 mt-1 text-sm">{errors.hobby}</p>
                )}
              </div>

              {/* Region field */}
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2" htmlFor="region">
                  <FiMapPin className="mr-2 text-yellow-500" />
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.region ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 bg-white`}
                >
                  <option value="">Select Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p className="text-red-500 mt-1 text-sm">{errors.region}</p>
                )}
              </div>
            </div>

            {/* Description field */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2" htmlFor="description">
                <FiFileText className="mr-2 text-yellow-500" />
                Description (min 30 characters)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 resize-none`}
                placeholder="Describe the hobby in detail..."
              />
              <div className="flex justify-between mt-1 text-sm">
                <span className={`${formData.description.length < 30 ? 'text-red-500' : 'text-green-500'}`}>
                  {formData.description.length} characters
                </span>
                <span className="text-gray-500">
                  Maximum 500 characters
                </span>
              </div>
              {errors.description && (
                <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Image upload field */}
            <div>
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <FiImage className="mr-2 text-yellow-500" />
                Upload an Image (optional)
              </label>
              
              {!formData.image ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-500 transition-colors duration-200 cursor-pointer" onClick={() => fileInputRef.current.click()}>
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">Click to upload an image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative mt-2 rounded-lg overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-opacity duration-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg shadow transition-all duration-200 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Suggestion'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;