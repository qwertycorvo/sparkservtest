import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, XCircle, Clock, PesoSign } from 'lucide-react';

const CustomerEstimates = () => {
  const { user } = useAuth();
  const { estimateRequests, estimates, acceptEstimate, declineEstimate } = useData();

  const myRequests = estimateRequests.filter(req => req.customer === user?.name);
  const myEstimates = estimates.filter(est => est.customer === user?.name);

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
          <h1 className="text-3xl font-bold text-slate-900">My Estimates</h1>
          <p className="text-slate-500 mt-2">View and respond to estimates from technicians</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-500">Pending Estimates</p>
          <p className="text-2xl font-bold text-slate-900">{myRequests.filter(r => r.status === 'pending').length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <PesoSign className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">Estimates Received</p>
          <p className="text-2xl font-bold text-slate-900">{myEstimates.length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">Accepted</p>
          <p className="text-2xl font-bold text-slate-900">{myEstimates.filter(e => e.status === 'accepted').length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <XCircle className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">Declined</p>
          <p className="text-2xl font-bold text-slate-900">{myEstimates.filter(e => e.status === 'declined').length}</p>
        </div>
      </div>

      {/* Estimate Cards */}
      <div className="space-y-4">
        {myRequests.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
            <p className="text-slate-500">No estimate requests yet.</p>
          </div>
        ) : (
          myRequests.map(request => {
            const estimate = myEstimates.find(e => e.requestId === request.id);
            return (
              <div key={request.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{request.technician}</h3>
                    <p className="text-sm text-slate-600">
                      {request.appliance} - {request.problem}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[request.status]}`}>
                    {request.status}
                  </span>
                </div>

                {estimate && (
                  <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-2">Estimate Details:</h4>
                    <p className="text-3xl font-bold text-primary-600 mb-2">{estimate.amount}</p>
                    <p className="text-slate-600">{estimate.description}</p>
                  </div>
                )}

                {estimate && estimate.status === 'sent' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => acceptEstimate(estimate.id)}
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
                    >
                      Accept & Book
                    </button>
                    <button
                      onClick={() => declineEstimate(estimate.id)}
                      className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all"
                    >
                      Decline
                    </button>
                  </div>
                )}

                {!estimate && (
                  <p className="text-center text-slate-500 py-4">Waiting for technician to send an estimate...</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CustomerEstimates;
