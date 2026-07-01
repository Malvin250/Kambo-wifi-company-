import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/authStore';
import { FaWifi } from 'react-icons/fa';

function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, error, loading } = useStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [adminError, setAdminError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setAdminError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.email, formData.password);
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setAdminError('Only administrators can access this area');
      }
    } catch (err) {
      // Error is handled by store
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <FaWifi className="text-purple-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">Kambo WiFi</h1>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          {(error || adminError) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error || adminError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Signing In...' : 'Admin Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
