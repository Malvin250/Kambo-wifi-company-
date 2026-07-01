import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWifi, FaHome, FaUsers, FaBox, FaTicketAlt, FaCreditCard, FaBarChart, FaSignOutAlt } from 'react-icons/fa';
import { useStore } from '../store/authStore';

function AdminSidebar() {
  const location = useLocation();
  const { logout } = useStore();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-900 text-white shadow-lg hidden md:block flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <FaWifi className="text-yellow-400" />
          <span>Kambo Admin</span>
        </div>
      </div>

      <nav className="mt-6 flex-1">
        <Link
          to="/admin/dashboard"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/admin/dashboard')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaHome className="text-xl" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/admin/users"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/admin/users')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaUsers className="text-xl" />
          <span>Users</span>
        </Link>

        <Link
          to="/admin/packages"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/admin/packages')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaBox className="text-xl" />
          <span>Packages</span>
        </Link>

        <Link
          to="/admin/vouchers"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/admin/vouchers')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaTicketAlt className="text-xl" />
          <span>Vouchers</span>
        </Link>

        <Link
          to="/admin/payments"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/admin/payments')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaCreditCard className="text-xl" />
          <span>Payments</span>
        </Link>

        <Link
          to="/admin/reports"
          className={`flex items-center space-x-3 px-6 py-3 ${
            isActive('/admin/reports')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <FaBarChart className="text-xl" />
          <span>Reports</span>
        </Link>
      </nav>

      <div className="p-6 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-6 py-3 text-red-400 hover:bg-red-900 hover:bg-opacity-30 rounded-lg"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
