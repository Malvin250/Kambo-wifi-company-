import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useStore } from '../store/authStore';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

function PrivateLayout() {
  const { isAuthenticated, user } = useStore();

  if (!isAuthenticated || user?.role !== 'user') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;
