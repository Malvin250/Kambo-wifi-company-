import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setFormData(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
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
      await axios.put(`${API_URL}/users/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profile updated successfully');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            {message && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-gray-100"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-gray-100"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ''}
                disabled
                className="input-field disabled:bg-gray-100"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-100"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-100"
              />
              <div className="flex space-x-4">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Account Info</h3>
            <p className="text-gray-600"><strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-600 mt-2"><strong>Status:</strong> <span className="text-green-600">Active</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
