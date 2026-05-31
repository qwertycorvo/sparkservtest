import React from 'react';
import { 
  Users, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  AlertCircle,
  MapPin,
  Star,
  ClipboardList,
  History
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardOverview = () => {
  const { user } = useAuth();

  const stats = {
    admin: [
      { label: 'Total Technicians', value: '20', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Active Repairs', value: '12', icon: Wrench, color: 'text-orange-600', bg: 'bg-orange-50' },
      { label: 'Pending Approvals', value: '5', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
      { label: 'Completed Jobs', value: '200', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    ],
    customer: [
      { label: 'My Appliances', value: '4', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Active Requests', value: '1', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
      { label: 'Total Repairs', value: '8', icon: History, color: 'text-green-600', bg: 'bg-green-50' },
    ],
    technician: [
      { label: 'Assigned Jobs', value: '3', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Completed Today', value: '2', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Rating', value: '4.9', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    ]
  };

  const currentStats = stats[user?.role] || [];

  if (!user) {
    return <div className="p-8 text-slate-500">Loading user profile...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
          <p className="text-slate-500 mt-2">SparkServ is active in <span className="text-primary-600 font-bold">Cagayan de Oro City</span>.</p>
        </div>
        <div className="hidden md:block bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Main Hub</p>
          <p className="text-xs font-bold text-blue-700">CDO - Misamis Oriental</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                {stat.icon && <stat.icon className="h-6 w-6" />}
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Local CDO Activity</h2>
          <div className="space-y-6">
            {[
              { id: '1021', loc: 'Divisoria', issue: 'AC Cleaning' },
              { id: '1022', loc: 'USTP Lapasan', issue: 'Fridge Repair' },
              { id: '1023', loc: 'Macasandig', issue: 'Washing Machine' }
            ].map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Repair Request #{item.id}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.issue} - {item.loc}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Just now</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Tips Section */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-3xl text-white shadow-xl shadow-primary-200">
          <h2 className="text-xl font-bold mb-4">SparkServ Tip</h2>
          <p className="text-primary-100/90 leading-relaxed">
            Regular maintenance can extend your appliance life by up to 30%. Check our AI Helper for basic troubleshooting tips before booking!
          </p>
          <button className="mt-8 bg-white text-primary-600 px-6 py-3 rounded-2xl font-bold hover:bg-primary-50 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
