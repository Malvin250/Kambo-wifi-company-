import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function ReportsPage() {
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await axios.get(`${API_URL}/admin/reports?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchReports();
  };

  if (loading) return <div className="text-center py-8">Loading reports...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reports</h1>

      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Filter by Date</h2>
        <form onSubmit={handleFilter} className="flex gap-4 flex-wrap">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn-primary">
            Generate Report
          </button>
        </form>
      </div>

      {/* Payment Statistics */}
      {reports.payments && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Payment Statistics</h3>
            <p className="text-gray-600"><strong>Total Transactions:</strong> {reports.payments.totalTransactions || 0}</p>
            <p className="text-gray-600"><strong>Total Amount:</strong> KES {reports.payments.totalAmount || 0}</p>
            <p className="text-gray-600"><strong>Average Amount:</strong> KES {Math.round(reports.payments.avgAmount || 0)}</p>
          </div>

          {/* Voucher Statistics */}
          {reports.vouchers && (
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Voucher Statistics</h3>
              {reports.vouchers.map((stat) => (
                <p key={stat._id} className="text-gray-600">
                  <strong>{stat._id || 'Unknown'}:</strong> {stat.count}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Session Statistics */}
      {reports.sessions && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Session Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600"><strong>Total Sessions:</strong> {reports.sessions.totalSessions || 0}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Average Duration (mins):</strong> {Math.round(reports.sessions.avgDuration || 0)}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Total Data Used (MB):</strong> {Math.round(reports.sessions.totalDataUsed || 0)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsPage;
