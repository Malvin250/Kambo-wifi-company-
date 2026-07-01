import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/payments/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data.payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = filterStatus
    ? payments.filter(p => p.status === filterStatus)
    : payments;

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  if (loading) return <div className="text-center py-8">Loading payments...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Payment Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <p className="text-gray-600 font-semibold">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-2">KES {totalRevenue}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 font-semibold">Completed Payments</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{payments.filter(p => p.status === 'completed').length}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 font-semibold">Pending Payments</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{payments.filter(p => p.status === 'pending').length}</p>
        </div>
      </div>

      <div className="card mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full md:w-48"
        >
          <option value="">All Payments</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{payment.user?.firstName} {payment.user?.lastName}</td>
                <td className="px-4 py-3 font-semibold">KES {payment.amount}</td>
                <td className="px-4 py-3 capitalize">{payment.paymentMethod}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3">{new Date(payment.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-mono text-sm">{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPayments.length === 0 && (
          <p className="text-center py-8 text-gray-600">No payments found.</p>
        )}
      </div>
    </div>
  );
}

export default PaymentManagement;
