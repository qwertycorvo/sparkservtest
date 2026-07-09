import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './components/Login';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import JobMonitoring from './pages/JobMonitoring';
import Appliances from './pages/Appliances';
import UserManagement from './pages/UserManagement';
import JobTracking from './pages/JobTracking';
import RequestRepair from './pages/RequestRepair';
import RepairHistory from './pages/RepairHistory';
import BookingReview from './pages/BookingReview';
import Inquiry from './pages/Inquiry';
import ProgressTracking from './pages/ProgressTracking';
import AdminProgressTracking from './pages/AdminProgressTracking';
import TechnicianProgressTracking from './pages/TechnicianProgressTracking';
import Payments from './pages/Payments';
import SupportTickets from './pages/SupportTickets';
import ServiceInquiry from './pages/SmartRepairAssistant';
import CustomerEstimates from './pages/CustomerEstimates';
import TechnicianEstimates from './pages/TechnicianEstimates';
import EstimateRequestForm from './pages/EstimateRequestForm';
import AIInsights from './pages/AIInsights';

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
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/job-monitoring" element={<JobMonitoring />} />
              <Route path="/appliances" element={<Appliances />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/jobs" element={<BookingReview />} />
              <Route path="/inquiry" element={<Inquiry />} />
              <Route path="/request" element={<RequestRepair />} />
              <Route path="/progress" element={<ProgressTracking />} />
              <Route path="/admin-progress" element={<AdminProgressTracking />} />
              <Route path="/tech-progress" element={<TechnicianProgressTracking />} />
              <Route path="/history" element={<RepairHistory />} />
              <Route path="/bookings" element={<BookingReview />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/tickets" element={<SupportTickets />} />
              <Route path="/messages" element={<Placeholder title="Messages" />} />
              <Route path="/navigation" element={<JobTracking />} />
              <Route path="/troubleshooting" element={<ServiceInquiry />} />
              <Route path="/smart-repair" element={<ServiceInquiry />} />
              <Route path="/service-inquiry" element={<ServiceInquiry />} />
              <Route path="/settings" element={<Placeholder title="System Settings" />} />
              <Route path="/customer-estimates" element={<CustomerEstimates />} />
              <Route path="/ai-inquiry" element={<ServiceInquiry />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/tech-estimates" element={<TechnicianEstimates />} />
              <Route path="/request-estimate/:techId?" element={<EstimateRequestForm />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
