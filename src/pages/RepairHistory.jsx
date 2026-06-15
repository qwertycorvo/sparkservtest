import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  FileText,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RepairHistory = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  // Mock repair history data - CDO-specific
  const repairs = [
    {
      id: 'SR-1024',
      date: 'June 14, 2026',
      appliance: 'Air Conditioner (Carrier)',
      issue: 'Leaking water and not cooling',
      technician: 'Peter Lim',
      location: 'Macasandig, Cagayan de Oro',
      landmark: 'Near Corpus Christi School',
      status: 'completed',
      cost: '₱1,850',
      duration: '1hr 45 mins',
      rating: 5,
      notes: 'Cleaned condenser coils and replaced clogged drain hose',
      photos: ['before', 'after']
    },
    {
      id: 'SR-1021',
      date: 'May 28, 2026',
      appliance: 'Refrigerator (Panasonic)',
      issue: 'Freezer not freezing properly',
      technician: 'Maria Santos',
      location: 'USTP Campus, CDO',
      landmark: 'Engineering Building',
      status: 'completed',
      cost: '₱2,200',
      duration: '2hrs 10 mins',
      rating: 4,
      notes: 'Replaced defrost timer and cleaned evaporator coils',
      photos: ['before', 'after']
    },
    {
      id: 'SR-1018',
      date: 'May 10, 2026',
      appliance: 'Washing Machine (LG)',
      issue: 'Not spinning during cycle',
      technician: 'John Technician',
      location: 'Divisoria, CDO',
      landmark: 'Golden Friendship Park',
      status: 'completed',
      cost: '₱1,500',
      duration: '1hr 30 mins',
      rating: 5,
      notes: 'Replaced worn-out drive belt and motor coupling',
      photos: ['before', 'after']
    }
  ];

  const filteredRepairs = filter === 'all' ? repairs : repairs.filter(r => 
    r.appliance.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Repair History</h1>
          <p className="text-slate-500 mt-2">Complete record of all your appliance repairs</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by appliance or issue..."
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary-500 transition-all"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-50 rounded-xl text-primary-600">
              <Wrench className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Total Repairs</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{repairs.length}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-xl text-green-600">
              <Star className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Avg. Rating</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {(repairs.reduce((acc, r) => acc + r.rating, 0) / repairs.length).toFixed(1)}/5
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-xl text-orange-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Total Spent</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">₱5,550</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Calendar className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-slate-500">Last Service</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">Today</p>
        </div>
      </div>

      {/* Repair Cards */}
      <div className="space-y-6">
        {filteredRepairs.map((repair) => (
          <div key={repair.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
                      #{repair.id}
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {repair.date}
                    </p>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{repair.appliance}</h3>
                  <p className="text-slate-600 mt-1">{repair.issue}</p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < repair.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-primary-600">{repair.cost}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Technician</p>
                  <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
                      {repair.technician.charAt(0)}
                    </div>
                    {repair.technician}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                  <p className="text-sm text-slate-700 flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {repair.location}
                  </p>
                  <p className="text-xs text-primary-600">{repair.landmark}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                  <p className="text-sm text-slate-700 flex items-center gap-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    {repair.duration}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Photos</p>
                  <div className="flex gap-2">
                    {repair.photos.map((p, i) => (
                      <div key={i} className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700 capitalize">
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Repair Notes</p>
                <p className="text-slate-700">{repair.notes}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all">
                  <FileText className="h-5 w-5" />
                  View Details
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
                  <Download className="h-5 w-5" />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why This Matters for Capstone */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Explain This to Your Panel</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Customer Convenience
            </h4>
            <p className="text-primary-100/90">
              Customers can track all repairs, view technician feedback, and download receipts anytime.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Quality Assurance
            </h4>
            <p className="text-primary-100/90">
              Rating system and detailed notes ensure service quality and accountability.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Localized for CDO
            </h4>
            <p className="text-primary-100/90">
              All records show Cagayan de Oro landmarks, making it realistic for your panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairHistory;
