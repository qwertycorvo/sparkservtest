import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Send, CheckCircle2, Clock, Coins } from 'lucide-react';

const TechnicianEstimates = () => {
  const { user } = useAuth();
  const { estimateRequests, sendEstimate, estimates } = useData();

  // Filter requests for current technician
  const myRequests = estimateRequests.filter(req => req.technician === user?.name);
  const myEstimates = estimates.filter(est => est.technician === user?.name);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [estimateForm, setEstimateForm] = useState({ amount: '', description: '' });

  const handleSendEstimate = (requestId) => {
    sendEstimate({
      requestId: requestId,
      customer: selectedRequest.customer,
      technician: user?.name,
      amount: estimateForm.amount,
      description: estimateForm.description
    });
    setSelectedRequest(null);
    setEstimateForm({ amount: '', description: '' });
  };

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-700',
    'estimated': 'bg-blue-100 text-blue-700',
    'accepted': 'bg-green-100 text-green-700',
    'declined': 'bg-red-100 text-red-700'
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Estimate Requests</h1>
          <p className="text-slate-500 mt-2">View and respond to customer estimate requests</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-500">Pending Requests</p>
          <p className="text-2xl font-bold text-slate-900">{myRequests.filter(r => r.status === 'pending').length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Send className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">Estimates Sent</p>
          <p className="text-2xl font-bold text-slate-900">{myEstimates.length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">Estimates Accepted</p>
          <p className="text-2xl font-bold text-slate-900">{myEstimates.filter(e => e.status === 'accepted').length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Coins className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">Total Estimated</p>
          <p className="text-2xl font-bold text-slate-900">
            {myEstimates.length > 0 ? '₱' + myEstimates.reduce((sum, e) => {
              const num = parseFloat(e.amount.replace(/[^0-9.-]+/g, ''));
              return sum + (isNaN(num) ? 0 : num);
            }, 0).toLocaleString() : '₱0'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Requests</h2>
          {myRequests.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
              <p className="text-slate-500">No estimate requests yet.</p>
            </div>
          ) : (
            myRequests.map(request => (
              <div 
                key={request.id} 
                className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer transition-all hover:shadow-md ${selectedRequest?.id === request.id ? 'ring-2 ring-primary-500' : ''}`}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{request.customer}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[request.status]}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{request.appliance}</p>
                    <p className="text-sm text-slate-500 mt-1">{request.problem}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Estimate Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Send Estimate</h2>
          {selectedRequest ? (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">{selectedRequest.customer}</h3>
              <p className="text-sm text-slate-600 mb-4">
                <span className="font-semibold">Appliance:</span> {selectedRequest.appliance}<br />
                <span className="font-semibold">Problem:</span> {selectedRequest.problem}
              </p>
              {selectedRequest.status === 'pending' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Amount</label>
                    <input
                      type="text"
                      placeholder="₱0.00"
                      value={estimateForm.amount}
                      onChange={(e) => setEstimateForm({ ...estimateForm, amount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea
                      placeholder="Description of the work to be done"
                      value={estimateForm.description}
                      onChange={(e) => setEstimateForm({ ...estimateForm, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-500"
                      rows={4}
                    />
                  </div>
                  <button
                    onClick={() => handleSendEstimate(selectedRequest.id)}
                    disabled={!estimateForm.amount || !estimateForm.description}
                    className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    Send Estimate
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500">Estimate already sent for this request.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
              <p className="text-slate-500">Select a request to send an estimate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianEstimates;
