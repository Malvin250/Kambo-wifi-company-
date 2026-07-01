import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/authStore';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';

// Customer Pages
import DashboardPage from './pages/customer/DashboardPage';
import ProfilePage from './pages/customer/ProfilePage';
import PackagesPage from './pages/customer/PackagesPage';
import VoucherPage from './pages/customer/VoucherPage';
import SessionHistoryPage from './pages/customer/SessionHistoryPage';
import PaymentHistoryPage from './pages/customer/PaymentHistoryPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import PackageManagement from './pages/admin/PackageManagement';
import VoucherManagement from './pages/admin/VoucherManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import ReportsPage from './pages/admin/ReportsPage';

function App() {
  const { isAuthenticated, user, initializeAuth } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4 mx-auto"></div>
          <p className="text-white text-lg font-semibold">Loading Kambo WiFi...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>

        {/* Customer Routes */}
        {isAuthenticated && user?.role === 'user' && (
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/vouchers" element={<VoucherPage />} />
            <Route path="/sessions" element={<SessionHistoryPage />} />
            <Route path="/payments" element={<PaymentHistoryPage />} />
          </Route>
        )}

        {/* Admin Routes */}
        {isAuthenticated && user?.role === 'admin' && (
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/packages" element={<PackageManagement />} />
            <Route path="/admin/vouchers" element={<VoucherManagement />} />
            <Route path="/admin/payments" element={<PaymentManagement />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
          </Route>
        )}

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
