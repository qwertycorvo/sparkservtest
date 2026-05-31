import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Camera,
  ChevronRight,
  Info
} from 'lucide-react';

const JobTracking = () => {
  const [activeJob, setActiveJob] = useState({
    id: 'SR-1025',
    customer: 'Alice Smith',
    address: 'USTP Campus, C.M. Recto Ave, Lapasan',
    landmark: 'Near Engineering Building',
    appliance: 'Washing Machine (LG Smart)',
    issue: 'Heavy vibration during spin cycle',
    status: 'Assigned', // Assigned -> In Progress -> Completed
    time: 'Today, 2:00 PM',
  });

  const cdoLocations = [
    { name: 'Divisoria (Plaza Divisoria)', address: 'R.N. Abejuela St, Cagayan de Oro', landmark: 'Golden Friendship Park' },
    { name: 'USTP Main Campus', address: 'C.M. Recto Ave, Lapasan', landmark: 'Science and Technology Complex' },
    { name: 'Macasandig', address: 'Tomas Saco St, Macasandig', landmark: 'Near Corpus Christi School' },
    { name: 'Limketkai Center', address: 'Lapasan, Cagayan de Oro', landmark: 'Near Atrium' },
    { name: 'Carmen', address: 'Vamenta Blvd, Carmen', landmark: 'Near Carmen Public Market' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Active Job Tracking</h1>
          <p className="text-slate-500 mt-2">Manage your current repair job and navigate to customer location in CDO.</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Service Area</p>
          <div className="flex items-center gap-2 text-primary-600 font-bold">
            <MapPin className="h-4 w-4" />
            Cagayan de Oro City
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Job Details & Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <span className="px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Job ID: {activeJob.id}
              </span>
              <div className="flex items-center gap-2 text-green-600">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold">{activeJob.status}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeJob.appliance}</h2>
            <p className="text-slate-500 mb-8">{activeJob.issue}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scheduled Time</p>
                  <p className="text-sm font-bold text-slate-900">{activeJob.time}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Location</p>
                  <p className="text-sm font-bold text-slate-900">{activeJob.address}</p>
                  <p className="text-xs text-primary-600 font-medium mt-1">Landmark: {activeJob.landmark}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-100">
              <button className="flex-1 min-w-[150px] bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-200">
                <Camera className="h-5 w-5" />
                Upload Photos
              </button>
              <button className="flex-1 min-w-[150px] bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200">
                <CheckCircle2 className="h-5 w-5" />
                Mark Completed
              </button>
            </div>
          </div>

          {/* CDO Location Quick Select for Demo */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Service Area Checkpoints (CDO)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cdoLocations.map((loc, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveJob({...activeJob, address: loc.address, landmark: loc.landmark})}
                  className="text-left p-4 rounded-2xl border border-slate-50 hover:border-primary-200 hover:bg-primary-50 transition-all group"
                >
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary-700">{loc.name}</p>
                  <p className="text-xs text-slate-500 mt-1 truncate">{loc.address}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Repair Notes</h3>
            <textarea 
              placeholder="Add technical notes, parts replaced, and findings..."
              className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none focus:border-primary-500 focus:bg-white transition-all mb-4"
            />
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Save Notes
            </button>
          </div>
        </div>

        {/* Right Column: Navigation & Contact */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-48 bg-slate-200 flex items-center justify-center relative">
              <MapPin className="h-12 w-12 text-primary-500 absolute z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              {/* This would be a real Google Map in production */}
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Map View (Mockup)</div>
            </div>
            <div className="p-6">
              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mb-4">
                <Navigation className="h-5 w-5" />
                Get Directions
              </button>
              <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                <Info className="h-3 w-3" />
                Location visible during active job only
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Contact Customer</h3>
            <div className="flex gap-4">
              <button className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <Phone className="h-6 w-6" />
                <span className="text-xs font-bold">Call</span>
              </button>
              <button className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">
                <MessageSquare className="h-6 w-6" />
                <span className="text-xs font-bold">Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTracking;
