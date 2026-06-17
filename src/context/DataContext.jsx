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

  const confirmPayment = (txnId) => {
    setTransactions(transactions.map(txn => 
      txn.id === txnId ? { ...txn, status: 'confirmed' } : txn
    ));
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
        matchTechnicians,
        submitRepairRequest,
        confirmPayment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
