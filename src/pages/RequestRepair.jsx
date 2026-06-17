import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2,
  MapPin,
  ClipboardList,
  User,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const RequestRepair = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { applianceTypes, commonProblems, matchTechnicians, submitRepairRequest, standardPricing } = useData();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    appliance: null,
    problem: null,
    problemDescription: '',
    schedule: '',
    landmark: '',
    address: '',
    selectedTechnician: null,
  });

  const matchedTechnicians = formData.appliance 
    ? matchTechnicians(formData.appliance.name) 
    : [];

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    submitRepairRequest({
      customer: user.name,
      appliance: formData.appliance.name,
      problem: formData.problem.name,
      selectedTechnician: formData.selectedTechnician,
    });
    setStep(5);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Request Repair</h1>
        <p className="text-slate-500 mt-2">Follow the steps to book a professional technician</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Progress Bar */}
        <div className="flex border-b border-slate-50">
          {['Appliance', 'Problem', 'Technician', 'Schedule', 'Confirm'].map((label, idx) => (
            <div 
              key={idx}
              className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors ${
                step > idx + 1 ? 'text-primary-600 bg-primary-50/30' : 
                step === idx + 1 ? 'text-primary-600 bg-primary-50/50' : 'text-slate-300'
              }`}
            >
              Step {idx + 1}: {label}
            </div>
          ))}
        </div>

        <div className="p-8">
          {/* Step 1: Select Appliance */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-slate-900">What appliance needs repair?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applianceTypes.map(appliance => (
                  <button
                    key={appliance.id}
                    onClick={() => setFormData({ ...formData, appliance })}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      formData.appliance?.id === appliance.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <Wrench className={`h-8 w-8 mb-2 ${formData.appliance?.id === appliance.id ? 'text-primary-600' : 'text-slate-400'}`} />
                    <p className="font-bold text-slate-900 text-lg">{appliance.name}</p>
                    <p className="text-sm text-slate-500 mt-1">{appliance.category}</p>
                  </button>
                ))}
              </div>
              <button
                disabled={!formData.appliance}
                onClick={handleNextStep}
                className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 disabled:opacity-50 transition-all shadow-lg shadow-primary-200"
              >
                Next Step
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Step 2: Select Problem */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-slate-900">What seems to be the problem?</h2>
              <div className="space-y-4">
                {(commonProblems[formData.appliance.name] || []).map(problem => (
                  <button
                    key={problem.id}
                    onClick={() => setFormData({ ...formData, problem })}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                      formData.problem?.id === problem.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <AlertCircle className={`h-6 w-6 mb-2 ${formData.problem?.id === problem.id ? 'text-primary-600' : 'text-slate-400'}`} />
                    <p className="font-bold text-slate-900">{problem.name}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Back
                </button>
                <button
                  disabled={!formData.problem}
                  onClick={handleNextStep}
                  className="flex-[2] bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 disabled:opacity-50 transition-all shadow-lg shadow-primary-200"
                >
                  Next Step
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Select Technician (Rule-Based Matching) */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-slate-900">Recommended Technicians</h2>
              <p className="text-slate-500">Based on your appliance type and technician expertise</p>
              
              <div className="space-y-4">
                {matchedTechnicians.length > 0 ? matchedTechnicians.map(tech => (
                  <button
                    key={tech.id}
                    onClick={() => setFormData({ ...formData, selectedTechnician: tech })}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                      formData.selectedTechnician?.id === tech.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <User className="h-7 w-7 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900 text-lg">{tech.name}</p>
                          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                            <TrendingUp className="h-4 w-4" />
                            {tech.matchScore}% Match
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{tech.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{tech.completedJobs} jobs completed</span>
                          <span>•</span>
                          <span>Available</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {tech.expertise.map(exp => (
                            <span key={exp} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                )) : (
                  <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">No available technicians</h3>
                    <p className="text-slate-600">We'll assign a technician as soon as possible.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 bg-slate-50 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Standard Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {standardPricing.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-xl">
                      <span className="text-slate-600">{item.service}</span>
                      <span className="font-bold text-primary-600">{item.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4">Final price will be provided after inspection</p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-[2] bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                >
                  Next Step
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Schedule */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-slate-900">When would you like the repair?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Preferred Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 focus:bg-white transition-all"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nearest Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g., Near USTP Gym"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 focus:bg-white transition-all"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Address</label>
                <textarea
                  className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 focus:bg-white transition-all"
                  placeholder="House number, Street, Barangay..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevStep}
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

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="py-12 text-center space-y-6 animate-in zoom-in duration-300">
              <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Request Submitted!</h2>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                  Your booking request has been sent to Admin for review. We'll notify you once it's approved!
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
