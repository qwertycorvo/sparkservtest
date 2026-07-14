import React, { useState } from 'react';
import { 
  Wrench, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  Info,
  Star,
  User,
  Briefcase
} from 'lucide-react';
import { useData } from '../context/DataContext';

const Inquiry = () => {
  const [activeTab, setActiveTab] = useState('issue');
  const { matchTechnicians, technicians } = useData();

  const tabs = [
    { id: 'issue', label: 'Ask About Issue', icon: Wrench },
    { id: 'cost', label: 'Request Estimate', icon: DollarSign },
    { id: 'availability', label: 'Check Availability', icon: Calendar },
    { id: 'clarify', label: 'Clarify Service', icon: MessageSquare }
  ];

  const [formData, setFormData] = useState({
    appliance: '',
    issue: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [inquirySent, setInquirySent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  // Mock data for availability
  const availableSlots = [
    { date: 'June 16, 2026', time: '9:00 AM - 11:00 AM', tech: 'John Technician' },
    { date: 'June 17, 2026', time: '1:00 PM - 3:00 PM', tech: 'Maria Santos' },
    { date: 'June 18, 2026', time: '10:00 AM - 12:00 PM', tech: 'Peter Lim' }
  ];

  // Mock data for common issues with estimates
  const commonIssues = [
    { issue: 'AC not cooling', estimate: '₱1,500 - ₱3,000' },
    { issue: 'Washing machine not spinning', estimate: '₱1,200 - ₱2,500' },
    { issue: 'Refrigerator not freezing', estimate: '₱2,000 - ₱4,000' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Service Inquiry</h1>
        <p className="text-slate-500 mt-2">Ask questions, request estimates, or check availability before booking</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-2 rounded-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Success Message */}
      {inquirySent && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-3xl flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6" />
          <div>
            <p className="font-bold">Inquiry Sent!</p>
            <p className="text-sm">We'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
            {/* Ask About Issue Tab */}
            {activeTab === 'issue' && (
              <div className="space-y-6">
                <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-2xl">
                  <Info className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <p className="font-bold text-primary-900">Describe your issue</p>
                    <p className="text-sm text-primary-800 mt-1">Tell us what's wrong and we'll help you understand the problem.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Appliance Type</label>
                    <select 
                      value={formData.appliance}
                      onChange={(e) => setFormData({...formData, appliance: e.target.value})}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                    >
                      <option value="">Select appliance...</option>
                      <option>Air Conditioner</option>
                      <option>Refrigerator</option>
                      <option>Washing Machine</option>
                      <option>Electric Fan</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">What's the issue?</label>
                    <textarea 
                      required
                      value={formData.issue}
                      onChange={(e) => setFormData({...formData, issue: e.target.value})}
                      className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                      placeholder="Describe what's happening with your appliance..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                  >
                    <Send className="h-5 w-5" />
                    Send Inquiry
                  </button>
                </form>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Common Issues</p>
                  <div className="space-y-2">
                    {commonIssues.map((item, i) => (
                      <button 
                        key={i}
                        onClick={() => setFormData({...formData, issue: item.issue})}
                        className="w-full text-left p-4 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-200 transition-all"
                      >
                        <p className="font-semibold text-slate-900">{item.issue}</p>
                        <p className="text-sm text-primary-600 mt-1">Estimate: {item.estimate}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Request Estimate Tab */}
            {activeTab === 'cost' && (
              <div className="space-y-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
                  <DollarSign className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-bold text-blue-900">Get a free estimate</p>
                    <p className="text-sm text-blue-800 mt-1">Provide details and we'll give you an estimated cost.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Appliance Type</label>
                    <select 
                      value={formData.appliance}
                      onChange={(e) => setFormData({...formData, appliance: e.target.value})}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                    >
                      <option value="">Select appliance...</option>
                      <option>Air Conditioner</option>
                      <option>Refrigerator</option>
                      <option>Washing Machine</option>
                      <option>Electric Fan</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Describe the problem</label>
                    <textarea 
                      required
                      value={formData.issue}
                      onChange={(e) => setFormData({...formData, issue: e.target.value})}
                      className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                      placeholder="Tell us what's wrong..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    <Send className="h-5 w-5" />
                    Request Estimate
                  </button>
                </form>
              </div>
            )}

            {/* Check Availability Tab */}
            {activeTab === 'availability' && (
              <div className="space-y-6">
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl">
                  <Calendar className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <p className="font-bold text-orange-900">Check technician availability</p>
                    <p className="text-sm text-orange-800 mt-1">See available slots for your repair.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-700">Available Slots</p>
                  {availableSlots.map((slot, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 hover:bg-primary-50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-900">{slot.date}</p>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Available</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-700">{slot.time}</p>
                        <p className="text-sm text-primary-600 font-medium">Tech: {slot.tech}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setInquirySent(true)}
                  className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                >
                  <Send className="h-5 w-5" />
                  Reserve Slot
                </button>
              </div>
            )}

            {/* Clarify Service Tab */}
            {activeTab === 'clarify' && (
              <div className="space-y-6">
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-2xl">
                  <MessageSquare className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <p className="font-bold text-purple-900">Clarify service details</p>
                    <p className="text-sm text-purple-800 mt-1">Ask questions about our services, warranty, or process.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">What would you like to know?</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full h-40 rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                      placeholder="Ask about warranty, pricing, service process, etc."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
                  >
                    <Send className="h-5 w-5" />
                    Send Question
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technician Recommender */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recommended Technicians</h3>
            
            {formData.appliance ? (
              <div className="space-y-4">
                {matchTechnicians(formData.appliance).length > 0 ? (
                  matchTechnicians(formData.appliance).map(tech => (
                    <div key={tech.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 hover:bg-primary-50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{tech.name}</p>
                            <p className="text-xs text-slate-500">{tech.area}</p>
                          </div>
                        </div>
                        {tech.available && (
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            Available
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-slate-700">{tech.rating}</span>
                        <span className="text-xs text-slate-400">({tech.completedJobs} jobs)</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {tech.expertise.map((exp, i) => (
                          <span key={i} className="text-xs bg-white px-2 py-1 rounded-full text-slate-600 border border-slate-200">
                            {exp}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 text-xs font-semibold text-primary-600">
                        Match Score: {tech.matchScore}%
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No technicians found for this appliance type.</p>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="h-5 w-5 text-slate-400" />
                  <p className="text-sm text-slate-500">Select an appliance to see recommended technicians</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Ready to Book?</h3>
            <p className="text-sm text-slate-600 mb-4">
              If you're ready to schedule a repair, go directly to Request Repair.
            </p>
            <button 
              onClick={() => window.location.href = '/request'}
              className="w-full bg-primary-600 text-white py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all"
            >
              Go to Request Repair
            </button>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold mb-3">Why Inquire First?</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-xs">1</span>
                </div>
                <p>Get clear understanding of the issue</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-xs">2</span>
                </div>
                <p>Know the estimated cost upfront</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-xs">3</span>
                </div>
                <p>Check availability that fits your schedule</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
