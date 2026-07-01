import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [message, setMessage] = useState('');

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

  const handlePurchase = async (pkg) => {
    setSelectedPackage(pkg);
    // Payment flow would be implemented here
    setMessage(`Selected ${pkg.name} for purchase`);
  };

  if (loading) return <div className="text-center py-8">Loading packages...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">WiFi Packages</h1>
      
      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-4">{pkg.description}</p>
            
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="text-3xl font-bold text-green-600 mb-2">KES {pkg.price}</p>
              <p className="text-sm text-gray-600">
                {pkg.dataLimit} GB • {pkg.duration} {pkg.durationUnit}
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              {pkg.features?.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <FaCheck className="text-green-600 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase(pkg)}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Buy Now</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackagesPage;
