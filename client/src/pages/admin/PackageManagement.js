import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function PackageManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    dataLimit: '',
    duration: '',
    durationUnit: 'days',
    speed: '',
    features: '',
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/packages`);
      setPackages(response.data.packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setMessage('Error loading packages');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const packageData = {
        ...formData,
        price: parseFloat(formData.price),
        dataLimit: parseFloat(formData.dataLimit),
        duration: parseInt(formData.duration),
        features: formData.features.split(',').map(f => f.trim()),
      };

      await axios.post(`${API_URL}/packages`, packageData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Package created successfully');
      setFormData({
        name: '',
        description: '',
        price: '',
        dataLimit: '',
        duration: '',
        durationUnit: 'days',
        speed: '',
        features: '',
      });
      setShowForm(false);
      fetchPackages();
    } catch (error) {
      setMessage('Error creating package');
    }
  };

  if (loading) return <div className="text-center py-8">Loading packages...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Package Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <FaPlus />
          <span>New Package</span>
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      {showForm && (
        <div className="card mb-6">
          <h2 className="text-2xl font-bold mb-4">Create New Package</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Package Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              rows="2"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                placeholder="Price (KES)"
                value={formData.price}
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                type="number"
                name="dataLimit"
                placeholder="Data Limit (GB)"
                value={formData.dataLimit}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="input-field"
              />
              <select
                name="durationUnit"
                value={formData.durationUnit}
                onChange={handleChange}
                className="input-field"
              >
                <option>hours</option>
                <option>days</option>
                <option>weeks</option>
                <option>months</option>
              </select>
            </div>
            <input
              type="text"
              name="speed"
              placeholder="Speed (e.g., 10Mbps)"
              value={formData.speed}
              onChange={handleChange}
              className="input-field"
            />
            <textarea
              name="features"
              placeholder="Features (comma-separated)"
              value={formData.features}
              onChange={handleChange}
              className="input-field"
              rows="2"
            />
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                Create Package
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card">
            <h3 className="text-xl font-bold text-blue-600 mb-2">{pkg.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
            <p className="text-2xl font-bold text-green-600 mb-2">KES {pkg.price}</p>
            <p className="text-gray-600 text-sm mb-4">
              {pkg.dataLimit}GB • {pkg.duration} {pkg.durationUnit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackageManagement;
