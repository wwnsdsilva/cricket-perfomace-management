import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import PlayerManagement from '../components/admin/PlayerManagement';
import MatchDataEntry from '../components/admin/MatchDataEntry';
import ClubOperations from '../components/admin/ClubOperations';
import Reports from '../components/admin/Reports';

const AdminPage = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/players" element={<PlayerManagement />} />
        <Route path="/matches" element={<MatchDataEntry />} />
        <Route path="/operations" element={<ClubOperations />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<div className="p-8 text-center text-gray-500">Settings page coming soon...</div>} />
        <Route path="*" element={<AdminDashboard />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPage;
