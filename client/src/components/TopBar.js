import React from 'react';
import { useStore } from '../store/authStore';
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

function TopBar() {
  const { user, logout } = useStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {user?.firstName}!
        </h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <FaBell className="text-xl" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <FaCog className="text-xl" />
          </button>
          <button
            onClick={logout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
