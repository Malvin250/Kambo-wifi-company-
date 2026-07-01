import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Kambo WiFi</h3>
            <p className="text-gray-400">Fast, reliable WiFi services for everyone.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
              <li><a href="/register" className="hover:text-white">Register</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">Email: support@kambowifi.com</p>
            <p className="text-gray-400">Phone: +254 XXX XXX XXX</p>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Kambo WiFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
