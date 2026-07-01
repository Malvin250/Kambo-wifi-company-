import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function DashboardPage() {
  const [stats, setStats] = useState({
    activeSessions: 0,
    totalData: 0,
    activeVouchers: 0,
    totalSpent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const [sessionsRes, vouchersRes] = await Promise.all([
          axios.get(`${API_URL}/sessions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/vouchers`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const activeSessions = sessionsRes.data.sessions.filter(s => s.status === 'active').length;
        const totalData = sessionsRes.data.sessions.reduce((sum, s) => sum + (s.dataUsed || 0), 0);
        const activeVouchers = vouchersRes.data.vouchers.filter(v => v.status === 'active').length;

        setStats({
          activeSessions,
          totalData,
          activeVouchers,
          totalSpent: 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-gray-600 font-semibold">Active Sessions</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.activeSessions}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 font-semibold">Total Data Used</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalData} MB</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 font-semibold">Active Vouchers</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.activeVouchers}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 font-semibold">Total Spent</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">KES {stats.totalSpent}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
