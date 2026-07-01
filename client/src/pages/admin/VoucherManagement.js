import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function VoucherManagement() {
  const [vouchers, setVouchers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    packageId: '',
    quantity: '10',
    expiryDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [vouchersRes, packagesRes] = await Promise.all([
        axios.get(`${API_URL}/admin/vouchers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/packages`),
      ]);
      setVouchers(vouchersRes.data.vouchers);
      setPackages(packagesRes.data.packages);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error loading data');
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
      await axios.post(
        `${API_URL}/vouchers/generate`,
        {
          packageId: formData.packageId,
          quantity: parseInt(formData.quantity),
          expiryDate: formData.expiryDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Vouchers generated successfully');
      setFormData({
        packageId: '',
        quantity: '10',
        expiryDate: '',
      });
      setShowForm(false);
      fetchData();
    } catch (error) {
      setMessage('Error generating vouchers');
    }
  };

  if (loading) return <div className="text-center py-8">Loading vouchers...</div>;

  const activeVouchers = vouchers.filter(v => v.status === 'active').length;
  const usedVouchers = vouchers.filter(v => v.status === 'used').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Voucher Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <FaPlus />
          <span>Generate Vouchers</span>
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <p className="text-gray-600 font-semibold">Total Vouchers</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{vouchers.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 font-semibold">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{activeVouchers}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 font-semibold">Used</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{usedVouchers}</p>
        </div>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h2 className="text-2xl font-bold mb-4">Generate New Vouchers</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="packageId"
              value={formData.packageId}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.name} - KES {pkg.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="input-field"
            />
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="input-field"
            />
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                Generate
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

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Issued Date</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.slice(0, 10).map((voucher) => (
              <tr key={voucher._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">{voucher.code}</td>
                <td className="px-4 py-3">{voucher.package?.name}</td>
                <td className="px-4 py-3">{voucher.user?.firstName || 'Unassigned'}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    voucher.status === 'active' ? 'bg-green-100 text-green-800' :
                    voucher.status === 'used' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {voucher.status}
                  </span>
                </td>
                <td className="px-4 py-3">{new Date(voucher.issuedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VoucherManagement;
