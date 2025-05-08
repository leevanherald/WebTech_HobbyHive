import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FiUser, FiPhone, FiStar, FiMapPin, FiFileText, FiImage, FiUpload, FiX } from 'react-icons/fi';

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
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
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

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Suggest a New Hobby</h1>
            <p className="mt-2 text-indigo-100">
              Share your unique hobby ideas with our community
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FiUser className="mr-2 text-indigo-600" />
                Your Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FiPhone className="mr-2 text-indigo-600" />
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="1234567890"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            {/* Hobby and Region - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hobby Field */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <FiStar className="mr-2 text-indigo-600" />
                  Hobby Name
                </label>
                <input
                  name="hobby"
                  value={formData.hobby}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${errors.hobby ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  placeholder="e.g., Underwater Basket Weaving"
                />
                {errors.hobby && <p className="text-red-500 text-sm">{errors.hobby}</p>}
              </div>

              {/* Region Field */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <FiMapPin className="mr-2 text-indigo-600" />
                  Region
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${errors.region ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white`}
                >
                  <option value="">Select your region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FiFileText className="mr-2 text-indigo-600" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border-2 ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="Tell us about this hobby, why it's special, and how others can get started..."
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span className={formData.description.length < 30 ? 'text-red-500' : 'text-green-600'}>
                  {formData.description.length}/30 characters
                </span>
                <span>Max 500 characters</span>
              </div>
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <FiImage className="mr-2 text-indigo-600" />
                Upload Image (Optional)
              </label>
              
              {!formData.image ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="flex flex-col items-center">
                    <FiUpload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-gray-600">Click to upload an image</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute top-3 right-3 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg shadow-lg transition-all ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit Your Suggestion'
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