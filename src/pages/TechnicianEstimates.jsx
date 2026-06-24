import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Send, ArrowLeft, Camera, MapPin, Video, Mail, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TechnicianEstimates = () => {
  const { user } = useAuth();
  const { estimateRequests, sendEstimate, estimates } = useData();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [estimateForm, setEstimateForm] = useState({ labor: '', parts: '', serviceFee: '', description: '', duration: '' });
  const navigate = useNavigate();

  const myRequests = estimateRequests.filter(req => req.technician === user?.name);

  const handleSendEstimate = () => {
    if (!selectedRequest) return;
    const totalAmount = (parseFloat(estimateForm.labor) || 0) + (parseFloat(estimateForm.parts) || 0) + (parseFloat(estimateForm.serviceFee) || 0);
    sendEstimate({
      requestId: selectedRequest.id,
      customer: selectedRequest.customer,
      technician: user?.name,
      amount: `₱${totalAmount.toLocaleString()}`,
      description: estimateForm.description,
    });
    setSelectedRequest(null);
    setEstimateForm({ labor: '', parts: '', serviceFee: '', description: '', duration: '' });
  };

  return (
    <div className="max-w-md mx-auto">
      {selectedRequest ? (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
            <button onClick={() => setSelectedRequest(null)} className="p-1">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="font-semibold">REVIEW REQUEST #{selectedRequest.id}</h3>
            <div></div>
          </div>

          <div className="p-6 space-y-4">
            {/* Customer & Location */}
            <div className="space-y-2">
              <p className="text-sm font-bold">{selectedRequest.customer}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="h-3 w-3" />
                <span>Manila Fortich, Philippines</span>
              </div>
            </div>

            {/* Status */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
              <p className="text-xs font-semibold text-yellow-700 uppercase">Pending Estimate</p>
            </div>

            {/* Photo Preview Placeholders */}
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center">
                <Camera className="h-8 w-8 text-slate-300" />
              </div>
              <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center">
                <Camera className="h-8 w-8 text-slate-300" />
              </div>
            </div>

            {/* Estimate Form */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-semibold text-sm uppercase text-slate-700">Estimated Cost Breakdown</h4>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-slate-500">Labor</label>
                  <input
                    type="number"
                    placeholder="₱0"
                    value={estimateForm.labor}
                    onChange={(e) => setEstimateForm({...estimateForm, labor: e.target.value})}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Parts</label>
                  <input
                    type="number"
                    placeholder="₱0"
                    value={estimateForm.parts}
                    onChange={(e) => setEstimateForm({...estimateForm, parts: e.target.value})}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Service Fee</label>
                  <input
                    type="number"
                    placeholder="₱0"
                    value={estimateForm.serviceFee}
                    onChange={(e) => setEstimateForm({...estimateForm, serviceFee: e.target.value})}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="text-xs text-slate-500">Notes</label>
                <textarea
                  placeholder="Needs new waterline and filter. Estimated repair time: 2 hours."
                  value={estimateForm.description}
                  onChange={(e) => setEstimateForm({...estimateForm, description: e.target.value})}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                  rows="3"
                />
              </div>

              {/* Total */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Total Estimated Cost</span>
                  <span className="text-xl font-bold text-primary-600">
                    ₱{((parseFloat(estimateForm.labor) || 0) + (parseFloat(estimateForm.parts) || 0) + (parseFloat(estimateForm.serviceFee) || 0)).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  <p>Validity Period</p>
                  <p className="font-semibold">3 days</p>
                </div>
              </div>

              <button
                onClick={handleSendEstimate}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
              >
                SEND ESTIMATE
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Estimate Requests</h1>
          </div>

          {myRequests.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center">
              <p className="text-slate-500">No estimate requests yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myRequests.map(request => {
                const hasEstimate = estimates.find(e => e.requestId === request.id);
                return (
                  <div
                    key={request.id}
                    onClick={() => !hasEstimate && setSelectedRequest(request)}
                    className={`bg-white rounded-2xl p-6 border border-slate-100 ${!hasEstimate ? 'cursor-pointer hover:border-primary-500' : 'opacity-60'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-slate-900">{request.customer}</h3>
                        <p className="text-sm text-slate-500">{request.appliance} - {request.problem}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${hasEstimate ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {hasEstimate ? 'Estimate Sent' : 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TechnicianEstimates;
