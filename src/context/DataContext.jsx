import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Standard Service Pricing
  const standardPricing = [
    { id: 1, service: 'Inspection Fee', price: '₱300' },
    { id: 2, service: 'Refrigerator Checkup', price: '₱500' },
    { id: 3, service: 'Aircon Cleaning', price: '₱800' },
    { id: 4, service: 'Washing Machine Repair', price: '₱600' },
    { id: 5, service: 'Electric Fan Repair', price: '₱250' },
  ];

  // Appliance Types
  const applianceTypes = [
    { id: 1, name: 'Air Conditioner', category: 'cooling' },
    { id: 2, name: 'Refrigerator', category: 'cooling' },
    { id: 3, name: 'Washing Machine', category: 'laundry' },
    { id: 4, name: 'Electric Fan', category: 'cooling' },
    { id: 5, name: 'Television', category: 'entertainment' },
  ];

  // Common Problems per Appliance
  const commonProblems = {
    'Air Conditioner': [
      { id: 'ac1', name: 'Not cooling', tips: ['Check if the unit is plugged in', 'Clean or replace the air filter', 'Check if the thermostat is set correctly'] },
      { id: 'ac2', name: 'Making loud noise', tips: ['Check for loose parts', 'Clean the outdoor unit', 'Make sure the unit is properly installed'] },
      { id: 'ac3', name: 'Leaking water', tips: ['Check the drain pipe', 'Clean the drain pan', 'Make sure the unit is level'] },
    ],
    'Refrigerator': [
      { id: 'ref1', name: 'Not cooling', tips: ['Check if the door is closed properly', 'Clean the condenser coils', 'Check the temperature setting'] },
      { id: 'ref2', name: 'Making loud noise', tips: ['Check if the fridge is level', 'Clean the condenser fan', 'Make sure nothing is touching the back'] },
      { id: 'ref3', name: 'Water leaking', tips: ['Check the defrost drain', 'Make sure the fridge is level', 'Check the water supply line'] },
    ],
    'Washing Machine': [
      { id: 'wm1', name: 'Not spinning', tips: ['Check if the lid is closed', 'Check the load balance', 'Check the drive belt'] },
      { id: 'wm2', name: 'Not draining', tips: ['Clean the drain pump filter', 'Check the drain hose', 'Make sure the hose is not kinked'] },
      { id: 'wm3', name: 'Making loud noise', tips: ['Check the load balance', 'Check for loose objects', 'Make sure the machine is level'] },
    ],
  };

  // Technicians with Expertise
  const technicians = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      expertise: ['Air Conditioner', 'Electric Fan'],
      rating: 4.9,
      completedJobs: 120,
      available: true,
      area: 'Cagayan de Oro',
    },
    {
      id: 2,
      name: 'Maria Santos',
      expertise: ['Refrigerator', 'Air Conditioner'],
      rating: 4.8,
      completedJobs: 95,
      available: true,
      area: 'Cagayan de Oro',
    },
    {
      id: 3,
      name: 'Pedro Reyes',
      expertise: ['Washing Machine', 'Television'],
      rating: 4.7,
      completedJobs: 80,
      available: false,
      area: 'Cagayan de Oro',
    },
    {
      id: 4,
      name: 'Ana Cruz',
      expertise: ['Electric Fan', 'Washing Machine'],
      rating: 4.9,
      completedJobs: 110,
      available: true,
      area: 'Cagayan de Oro',
    },
  ];

  // Mock Repair Requests
  const [repairRequests, setRepairRequests] = useState([
    {
      id: 'SR-1001',
      customer: 'Jane Customer',
      appliance: 'Air Conditioner',
      problem: 'Not cooling',
      status: 'pending_approval',
      technician: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'SR-1002',
      customer: 'Jane Customer',
      appliance: 'Refrigerator',
      problem: 'Not cooling',
      status: 'in_progress',
      technician: 'Maria Santos',
      createdAt: new Date().toISOString(),
    },
  ]);

  // Mock Transactions
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-001',
      customer: 'Jane Customer',
      job: 'SR-1002',
      amount: '₱800',
      method: 'GCash',
      referenceNumber: 'GC-123456789',
      receiptUrl: null,
      status: 'pending_verification',
      createdAt: new Date().toISOString(),
    },
  ]);

  // Estimate Requests
  const [estimateRequests, setEstimateRequests] = useState([
    {
      id: 'EST-1001',
      customer: 'Jane Customer',
      technician: 'Juan Dela Cruz',
      appliance: 'Air Conditioner',
      problem: 'Not cooling',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  ]);

  // Estimates
  const [estimates, setEstimates] = useState([
    {
      id: 'ESTIMATE-1001',
      requestId: 'EST-1001',
      customer: 'Jane Customer',
      technician: 'Juan Dela Cruz',
      amount: '₱1,500',
      description: 'Aircon cleaning plus parts replacement (capacitor)',
      status: 'sent',
      createdAt: new Date().toISOString(),
    }
  ]);

  // --------------------------
  // SUPERADMIN-SPECIFIC DATA
  // --------------------------
  // Users List
  const [users, setUsers] = useState([
    { id: 1, name: 'John Technician', role: 'technician', status: 'Active', email: 'john@tech.com', joined: '2024-05-15' },
    { id: 2, name: 'Alice Smith', role: 'customer', status: 'Active', email: 'alice@example.com', joined: '2024-05-20' },
    { id: 3, name: 'Bob Wilson', role: 'technician', status: 'Inactive', email: 'bob@tech.com', joined: '2024-06-01' },
    { id: 4, name: 'Eve Brown', role: 'customer', status: 'Active', email: 'eve@example.com', joined: '2024-05-25' },
    { id: 5, name: 'Admin User', role: 'admin', status: 'Active', email: 'admin@sparkserv.com', joined: '2024-01-01' },
  ]);

  // Roles List
  const [roles, setRoles] = useState([
    { id: 1, name: 'Customer', permissions: ['view_dashboard', 'request_repair', 'view_progress'], status: 'Active' },
    { id: 2, name: 'Technician', permissions: ['view_dashboard', 'manage_jobs', 'send_estimates'], status: 'Active' },
    { id: 3, name: 'Admin', permissions: ['view_dashboard', 'manage_bookings', 'confirm_payments', 'view_users'], status: 'Active' },
    { id: 4, name: 'Superadmin', permissions: ['all'], status: 'Active' },
  ]);

  // System Config
  const [systemConfig, setSystemConfig] = useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    defaultCurrency: 'PHP',
    maxFileSizeMB: 10,
    sessionTimeoutMinutes: 60,
  });

  // System Logs
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'Superadmin', action: 'Created new user account', details: 'Added user: Jane Doe' },
    { id: 2, timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'Admin User', action: 'Updated booking status', details: 'SR-1001: pending_approval → in_progress' },
    { id: 3, timestamp: new Date(Date.now() - 10800000).toISOString(), user: 'System', action: 'Backup completed', details: 'Daily database backup successful' },
    { id: 4, timestamp: new Date(Date.now() - 14400000).toISOString(), user: 'Superadmin', action: 'Modified user role', details: 'User 3: role changed from customer to technician' },
  ]);

  // --------------------------
  // FUNCTIONS
  // --------------------------
  
  // Rule-based technician matching function
  const matchTechnicians = (applianceName) => {
    return technicians
      .filter(tech => tech.expertise.includes(applianceName) && tech.available)
      .map(tech => {
        let score = 0;
        if (tech.rating >= 4.8) score += 30;
        else if (tech.rating >= 4.5) score += 20;
        else score += 10;
        
        if (tech.completedJobs >= 100) score += 30;
        else if (tech.completedJobs >= 50) score += 20;
        else score += 10;
        
        score += 40;
        
        return { ...tech, matchScore: score };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const submitRepairRequest = (requestData) => {
    const newRequest = {
      id: `SR-${1000 + repairRequests.length + 1}`,
      ...requestData,
      status: 'pending_approval',
      technician: null,
      createdAt: new Date().toISOString(),
    };
    setRepairRequests([...repairRequests, newRequest]);
    return newRequest;
  };

  const submitEstimateRequest = (requestData) => {
    const newRequest = {
      id: `EST-${1000 + estimateRequests.length + 1}`,
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setEstimateRequests([...estimateRequests, newRequest]);
    return newRequest;
  };

  const sendEstimate = (estimateData) => {
    const newEstimate = {
      id: `ESTIMATE-${1000 + estimates.length + 1}`,
      ...estimateData,
      status: 'sent',
      createdAt: new Date().toISOString(),
    };
    // Update request status
    setEstimateRequests(estimateRequests.map(req => 
      req.id === estimateData.requestId ? { ...req, status: 'estimated' } : req
    ));
    setEstimates([...estimates, newEstimate]);
    return newEstimate;
  };

  const acceptEstimate = (estimateId) => {
    setEstimates(estimates.map(est => 
      est.id === estimateId ? { ...est, status: 'accepted' } : est
    ));
    // Find the estimate
    const estimate = estimates.find(e => e.id === estimateId);
    if (estimate) {
      setEstimateRequests(estimateRequests.map(req => 
        req.id === estimate.requestId ? { ...req, status: 'accepted' } : req
      ));
    }
  };

  const declineEstimate = (estimateId) => {
    setEstimates(estimates.map(est => 
      est.id === estimateId ? { ...est, status: 'declined' } : est
    ));
    const estimate = estimates.find(e => e.id === estimateId);
    if (estimate) {
      setEstimateRequests(estimateRequests.map(req => 
        req.id === estimate.requestId ? { ...req, status: 'declined' } : req
      ));
    }
  };

  const confirmPayment = (txnId) => {
    setTransactions(transactions.map(txn => 
      txn.id === txnId ? { ...txn, status: 'confirmed' } : txn
    ));
  };

  // --------------------------
  // SUPERADMIN FUNCTIONS
  // --------------------------
  const addUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      joined: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    setUsers([...users, newUser]);
    // Add log
    setSystemLogs([
      { id: systemLogs.length + 1, timestamp: new Date().toISOString(), user: 'Superadmin', action: 'Created new user account', details: `Added user: ${newUser.name}` },
      ...systemLogs
    ]);
  };

  const updateUser = (userId, userData) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...userData } : u));
    // Add log
    const user = users.find(u => u.id === userId);
    setSystemLogs([
      { id: systemLogs.length + 1, timestamp: new Date().toISOString(), user: 'Superadmin', action: 'Updated user account', details: `Updated user: ${user?.name}` },
      ...systemLogs
    ]);
  };

  const deactivateUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'Inactive' } : u));
    // Add log
    const user = users.find(u => u.id === userId);
    setSystemLogs([
      { id: systemLogs.length + 1, timestamp: new Date().toISOString(), user: 'Superadmin', action: 'Deactivated user account', details: `Deactivated user: ${user?.name}` },
      ...systemLogs
    ]);
  };

  const resetUserPassword = (userId) => {
    // Just mock for demo purposes
    const user = users.find(u => u.id === userId);
    setSystemLogs([
      { id: systemLogs.length + 1, timestamp: new Date().toISOString(), user: 'Superadmin', action: 'Reset user password', details: `Password reset for: ${user?.name}` },
      ...systemLogs
    ]);
  };

  const addRole = (roleData) => {
    const newRole = { id: roles.length + 1, ...roleData, status: 'Active' };
    setRoles([...roles, newRole]);
    // Add log
    setSystemLogs([
      { id: systemLogs.length + 1, timestamp: new Date().toISOString(), user: 'Superadmin', action: 'Created new user role', details: `Created role: ${newRole.name}` },
      ...systemLogs
    ]);
  };

  const updateRole = (roleId, roleData) => {
    setRoles(roles.map(r => r.id === roleId ? { ...r, ...roleData } : r));
    const role = roles.find(r => r.id === roleId);
    setSystemLogs([
      { id: systemLogs.length + 1, timestamp: new Date().toISOString(), user: 'Superadmin', action: 'Modified user role', details: `Updated role: ${role?.name}` },
      ...systemLogs
    ]);
  };

  const deactivateRole = (roleId) => {
    setRoles(roles.map(r => r.id === roleId ? { ...r, status: 'Inactive' } : r));
    const role = roles.find(r => r.id === roleId);
    setSystemLogs([
      { id: systemLogs.length + 1, timestamp: new Date().toISOString(), user: 'Superadmin', action: 'Deactivated user role', details: `Deactivated role: ${role?.name}` },
      ...systemLogs
    ]);
  };

  const updateSystemConfig = (configData) => {
    setSystemConfig({ ...systemConfig, ...configData });
    setSystemLogs([
      { id: systemLogs.length + 1, timestamp: new Date().toISOString(), user: 'Superadmin', action: 'Updated system configuration', details: `Config updated: ${Object.keys(configData).join(', ')}` },
      ...systemLogs
    ]);
  };

  return (
    <DataContext.Provider
      value={{
        standardPricing,
        applianceTypes,
        commonProblems,
        technicians,
        repairRequests,
        transactions,
        estimateRequests,
        estimates,
        matchTechnicians,
        submitRepairRequest,
        submitEstimateRequest,
        sendEstimate,
        acceptEstimate,
        declineEstimate,
        confirmPayment,
        // Superadmin
        users, setUsers,
        roles, setRoles,
        systemConfig, setSystemConfig,
        systemLogs, setSystemLogs,
        addUser, updateUser, deactivateUser, resetUserPassword,
        addRole, updateRole, deactivateRole,
        updateSystemConfig
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
