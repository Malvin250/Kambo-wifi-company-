import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function VoucherPage() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voucherCode, setVoucherCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/vouchers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVouchers(response.data.vouchers);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setMessage('Error loading vouchers');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateVoucher = async (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) {
      setMessage('Please enter a voucher code');
      setMessageType('error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/vouchers/activate`,
        { code: voucherCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Voucher activated successfully!');
      setMessageType('success');
      setVoucherCode('');
      fetchVouchers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error activating voucher');
      setMessageType('error');
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setMessage('Code copied to clipboard!');
    setMessageType('info');
  };

  if (loading) return <div className="text-center py-8">Loading vouchers...</div>;

  const activeVouchers = vouchers.filter(v => v.status === 'active');
  const usedVouchers = vouchers.filter(v => v.status === 'used');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Vouchers</h1>

      {message && (
        <div className={`mb-4 p-3 rounded ${
          messageType === 'success' ? 'bg-green-100 text-green-700' :
          messageType === 'error' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {message}
        </div>
      )}

      {/* Activate Voucher Form */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Activate New Voucher</h2>
        <form onSubmit={handleActivateVoucher} className="flex gap-2">
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
            placeholder="Enter voucher code"
            className="flex-1 input-field"
          />
          <button type="submit" className="btn-primary">
            Activate
          </button>
        </form>
      </div>

      {/* Active Vouchers */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Active Vouchers ({activeVouchers.length})</h2>
        {activeVouchers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeVouchers.map((voucher) => (
              <div key={voucher._id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-blue-600">Active</h3>
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <p className="text-2xl font-mono font-bold mb-4 break-all">{voucher.code}</p>
                {voucher.package && (
                  <div className="mb-4">
                    <p className="text-gray-600"><strong>Package:</strong> {voucher.package.name}</p>
                    <p className="text-gray-600"><strong>Data:</strong> {voucher.package.dataLimit} GB</p>
                    <p className="text-gray-600"><strong>Price:</strong> KES {voucher.price}</p>
                  </div>
                )}
                <button
                  onClick={() => copyToClipboard(voucher.code)}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <FaCopy />
                  <span>Copy Code</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No active vouchers. Purchase a package to get started!</p>
        )}
      </div>

      {/* Used Vouchers */}
      {usedVouchers.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Used Vouchers ({usedVouchers.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usedVouchers.map((voucher) => (
              <div key={voucher._id} className="card opacity-60">
                <h3 className="text-lg font-bold text-gray-600 mb-2">Used</h3>
                <p className="text-xl font-mono font-bold mb-2 break-all">{voucher.code}</p>
                <p className="text-sm text-gray-600">Used on {new Date(voucher.usedDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VoucherPage;
