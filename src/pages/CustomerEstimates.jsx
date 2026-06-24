import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, XCircle, ChevronDown, Camera, MapPin, Video, Mail } from 'lucide-react';

const CustomerEstimates = () => {
  const { user } = useAuth();
  const { estimateRequests, estimates, acceptEstimate, declineEstimate } = useData();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const myRequests = estimateRequests.filter(req => req.customer === user?.name);

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">My Estimates</h1>
      </div>

      {myRequests.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center">
          <p className="text-slate-500">No estimate requests yet.</p>
        </div>
      ) : (
        myRequests.map((request) => {
          const estimate = estimates.find(e => e.requestId === request.id);

          return (
            <div key={request.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              {/* Header (for estimate) */}
              {estimate && (
                <div className="bg-primary-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Your Repair Estimate</h3>
                    <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      Estimate Sent - Awaiting Approval
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4">
                {/* Estimate Display */}
                {estimate && (
                  <>
                    <div className="bg-green-100 text-green-800 rounded-2xl p-6 text-center">
                      <p className="text-sm mb-2">Total Cost</p>
                      <p className="text-4xl font-bold">{estimate.amount}</p>
                      <button
                        onClick={() => setShowBreakdown(!showBreakdown)}
                        className="mt-4 text-sm text-green-700 font-medium flex items-center justify-center gap-1"
                      >
                        VIEW BREAKDOWN
                        <ChevronDown className={`h-4 w-4 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {showBreakdown && (
                      <div className="space-y-3 text-sm">
                        <h4 className="font-semibold text-slate-900">Estimated Cost Breakdown</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-3 bg-slate-50 rounded-xl text-center">
                            <p className="text-xs text-slate-500">Labor</p>
                            <p className="font-bold">₱1200</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl text-center">
                            <p className="text-xs text-slate-500">Parts</p>
                            <p className="font-bold">₱3500</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl text-center">
                            <p className="text-xs text-slate-500">Service Fee</p>
                            <p className="font-bold">₱500</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-slate-100 pt-4 space-y-3">
                      <div>
                        <p className="text-xs text-slate-500 uppercase">Problem Confirmed</p>
                        <p className="text-sm font-semibold">{request.problem}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500 uppercase">Est. Duration</p>
                        <p className="text-sm font-semibold">2 hours</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {estimate.status === 'sent' && (
                        <>
                          <button
                            onClick={() => acceptEstimate(estimate.id)}
                            className="w-full py-3 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            ACCEPT ESTIMATE
                          </button>
                          <button
                            onClick={() => { }}
                            className="w-full py-3 border border-slate-300 text-slate-700 rounded-xl font-bold"
                          >
                            ASK REVISION
                          </button>
                          <button
                            onClick={() => declineEstimate(estimate.id)}
                            className="w-full py-3 border border-red-500 text-red-500 rounded-xl font-bold"
                          >
                            REJECT
                          </button>
                        </>
                      )}

                      {estimate.status === 'accepted' && (
                        <div className="text-center py-4 bg-green-50 rounded-xl">
                          <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="font-bold text-green-700">Estimate Accepted</p>
                        </div>
                      )}

                      {estimate.status === 'declined' && (
                        <div className="text-center py-4 bg-red-50 rounded-xl">
                          <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                          <p className="font-bold text-red-700">Estimate Declined</p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Pending Request Display */}
                {!estimate && (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <p className="text-sm text-yellow-600 font-semibold uppercase">Pending Estimate</p>
                    </div>
                    <p className="text-slate-500">Waiting for technician to send an estimate...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CustomerEstimates;
