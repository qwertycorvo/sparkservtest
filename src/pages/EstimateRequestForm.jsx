import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Camera, MapPin, Video, Mail } from 'lucide-react';

const EstimateRequestForm = () => {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { applianceTypes, submitEstimateRequest, technicians } = useData();
  const [selectedAppliance, setSelectedAppliance] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [problem, setProblem] = useState('');
  const [step, setStep] = useState(1);

  const selectedTech = technicians.find(t => t.id === parseInt(techId || '0'));

  const handleSubmit = () => {
    if (!selectedAppliance || !problem) return;
    submitEstimateRequest({
      customer: user?.name,
      technician: selectedTech?.name || 'Technician',
      appliance: selectedAppliance,
      problem,
    });
    navigate('/customer-estimates');
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-semibold">NEW ESTIMATE REQUEST</h3>
        <div></div>
      </div>

      {/* Step Indicator */}
      <div className="flex gap-2 p-4 bg-white">
        {['Request', 'Review', 'Estimate', 'Booking'].map((label, index) => (
          <button
            key={index}
            onClick={() => setStep(index + 1)}
            className={`flex-1 text-xs py-2 rounded-t-xl font-semibold ${step === index + 1 ? 'bg-primary-600 text-white' : 'bg-white text-slate-400'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="p-6 space-y-6">
        {/* Photo Upload */}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center">
          <Camera className="h-12 w-12 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">drag & drop or tap to<br />upload photos/videos</p>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Camera className="h-5 w-5" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Appliance Type */}
        <div className="space-y-2">
          <label className="text-sm text-slate-700">Appliance Type</label>
          <select
            value={selectedAppliance}
            onChange={(e) => setSelectedAppliance(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl"
          >
            <option value="">Select Appliance</option>
            {applianceTypes.map(app => (
              <option key={app.id} value={app.name}>{app.name}</option>
            ))}
          </select>
        </div>

        {/* Model Number */}
        <div className="space-y-2">
          <label className="text-sm text-slate-700">Model Number</label>
          <input
            type="text"
            placeholder="Model Number"
            value={modelNumber}
            onChange={(e) => setModelNumber(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl"
          />
        </div>

        {/* Problem Description */}
        <div className="space-y-2">
          <label className="text-sm text-slate-700">Problem Description</label>
          <textarea
            placeholder="Describe your issue..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl"
            rows="3"
          />
        </div>

        {/* Location Preview */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="h-40 bg-slate-100 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-slate-400" />
          </div>
          <div className="p-4 bg-white">
            <p className="text-sm text-slate-700">Manolo Fortich, Philippines</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-6">
        <button
          onClick={handleSubmit}
          disabled={!selectedAppliance || !problem}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold"
        >
          SUBMIT REQUEST
        </button>
      </div>
    </div>
  );
};

export default EstimateRequestForm;
