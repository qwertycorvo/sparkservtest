import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import AIInquiry from './pages/AIInquiry';
import Appliances from './pages/Appliances';
import UserManagement from './pages/UserManagement';
import JobTracking from './pages/JobTracking';
import RequestRepair from './pages/RequestRepair';
import Payments from './pages/Payments';

// Mock components for other routes
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>This module is under development.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/ai-inquiry" element={<AIInquiry />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/jobs" element={<JobTracking />} />
            <Route path="/request" element={<RequestRepair />} />
            <Route path="/history" element={<Placeholder title="Repair History" />} />
            <Route path="/bookings" element={<Placeholder title="Booking Review" />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/messages" element={<Placeholder title="Messages" />} />
            <Route path="/navigation" element={<JobTracking />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
