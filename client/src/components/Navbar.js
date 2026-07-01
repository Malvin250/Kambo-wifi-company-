import React from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaMenu } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <FaWifi className="text-yellow-400" />
            <span>Kambo WiFi</span>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaMenu className="text-2xl" />
          </button>

          <div className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
            <Link to="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
            <Link to="/login" className="hover:text-yellow-400 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-yellow-400 transition">
              Register
            </Link>
            <Link to="/admin/login" className="hover:text-yellow-400 transition">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
