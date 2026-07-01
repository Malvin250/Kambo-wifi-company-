import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWifi, FaHome, FaUser, FaHistory, FaCreditCard, FaTicketAlt } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-900 text-white shadow-lg hidden md:block">
      <div className="p-6">
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <FaWifi className="text-yellow-400" />
          <span>Kambo</span>
        </div>
      </div>

      <nav className="mt-6">
        <Link
          to="/dashboard"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/dashboard')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaHome className="text-xl" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/packages"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/packages')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaTicketAlt className="text-xl" />
          <span>Packages</span>
        </Link>

        <Link
          to="/vouchers"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/vouchers')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaTicketAlt className="text-xl" />
          <span>Vouchers</span>
        </Link>

        <Link
          to="/sessions"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/sessions')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaHistory className="text-xl" />
          <span>Sessions</span>
        </Link>

        <Link
          to="/payments"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/payments')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaCreditCard className="text-xl" />
          <span>Payments</span>
        </Link>

        <Link
          to="/profile"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/profile')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaUser className="text-xl" />
          <span>Profile</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
