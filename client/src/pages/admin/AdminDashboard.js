import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.dashboard);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setMessage('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {message}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-gray-600 font-semibold">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.users?.total || 0}</p>
          <p className="text-sm text-green-600 mt-1">Active: {stats.users?.active || 0}</p>
        </div>

        <div className="card">
          <h3 className="text-gray-600 font-semibold">Packages</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.packages || 0}</p>
        </div>

        <div className="card">
          <h3 className="text-gray-600 font-semibold">Vouchers</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.vouchers?.total || 0}</p>
          <p className="text-sm text-blue-600 mt-1">Active: {stats.vouchers?.active || 0}</p>
        </div>

        <div className="card">
          <h3 className="text-gray-600 font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">KES {stats.revenue || 0}</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Payment Stats</h3>
          <p className="text-gray-600"><strong>Completed:</strong> {stats.payments?.completed || 0}</p>
          <p className="text-gray-600"><strong>Pending:</strong> {stats.payments?.pending || 0}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">Session Stats</h3>
          <p className="text-gray-600"><strong>Active:</strong> {stats.sessions?.active || 0}</p>
          <p className="text-gray-600"><strong>Total:</strong> {stats.sessions?.total || 0}</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">Voucher Status</h3>
          <p className="text-gray-600"><strong>Used:</strong> {stats.vouchers?.used || 0}</p>
          <p className="text-gray-600"><strong>Active:</strong> {stats.vouchers?.active || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
