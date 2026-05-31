import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2,
  MapPin,
  ClipboardList
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RequestRepair = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    applianceId: '',
    issue: '',
    schedule: '',
    landmark: '',
    address: ''
  });

  const appliances = [
    { id: 1, name: 'Samsung Inverter AC', type: 'AC' },
    { id: 2, name: 'LG Smart Fridge', type: 'Refrigerator' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3); // Show success
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Request Repair</h1>
        <p className="text-slate-500 mt-2">Book a professional technician for your appliance in CDO.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Progress Bar */}
        <div className="flex border-b border-slate-50">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors ${
                step >= s ? 'text-primary-600 bg-primary-50/30' : 'text-slate-300'
              }`}
            >
              Step {s}
            </div>
          ))}
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Select Appliance</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {appliances.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setFormData({...formData, applianceId: app.id})}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        formData.applianceId === app.id 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <Wrench className={`h-6 w-6 mb-2 ${formData.applianceId === app.id ? 'text-primary-600' : 'text-slate-400'}`} />
                      <p className="font-bold text-slate-900">{app.name}</p>
                      <p className="text-xs text-slate-500">{app.type}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Describe the Issue</label>
                <textarea
                  className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 focus:bg-white transition-all"
                  placeholder="Tell us what's wrong..."
                  value={formData.issue}
                  onChange={(e) => setFormData({...formData, issue: e.target.value})}
                />
              </div>

              <button
                disabled={!formData.applianceId || !formData.issue}
                onClick={() => setStep(2)}
                className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 disabled:opacity-50 transition-all shadow-lg shadow-primary-200"
              >
                Continue to Scheduling
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Preferred Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 focus:bg-white transition-all"
                    value={formData.schedule}
                    onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nearest Landmark (CDO)</label>
                  <input
                    type="text"
                    placeholder="e.g., Near USTP Gym, Centrio Mall"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 focus:bg-white transition-all"
                    value={formData.landmark}
                    onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Address</label>
                <textarea
                  className="w-full h-24 rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 focus:bg-white transition-all"
                  placeholder="House number, Street, Barangay..."
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Back
                </button>
                <button
                  disabled={!formData.schedule || !formData.address}
                  onClick={handleSubmit}
                  className="flex-[2] bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 disabled:opacity-50 transition-all shadow-lg shadow-primary-200"
                >
                  Submit Booking Request
                  <ClipboardList className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-12 text-center space-y-6 animate-in zoom-in duration-300">
              <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Request Submitted!</h2>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                  Your booking request for {appliances.find(a => a.id === formData.applianceId)?.name} has been sent to Admin for review.
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestRepair;
