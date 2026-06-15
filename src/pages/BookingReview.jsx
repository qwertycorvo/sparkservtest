import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Wrench, 
  User, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  Filter,
  Search,
  Send
} from 'lucide-react';

const BookingReview = () => {
  const [filter, setFilter] = useState('pending');

  // Mock booking data - CDO-specific
  const bookings = [
    {
      id: 'BR-1029',
      customerName: 'Alice Smith',
      customerEmail: 'alice@example.com',
      appliance: 'Washing Machine (Samsung)',
      issue: 'Not draining water, makes loud grinding noise',
      preferredDate: 'June 17, 2026',
      preferredTime: '10:00 AM - 12:00 PM',
      location: 'USTP Campus, Cagayan de Oro',
      landmark: 'Near Engineering Building',
      status: 'pending',
      submittedOn: 'June 15, 2026',
      priority: 'medium'
    },
    {
      id: 'BR-1028',
      customerName: 'Bob Wilson',
      customerEmail: 'bob@example.com',
      appliance: 'Air Conditioner (Carrier)',
      issue: 'Not cooling, blowing warm air only',
      preferredDate: 'June 16, 2026',
      preferredTime: '2:00 PM - 4:00 PM',
      location: 'Divisoria, CDO',
      landmark: 'Golden Friendship Park',
      status: 'pending',
      submittedOn: 'June 14, 2026',
      priority: 'high'
    },
    {
      id: 'BR-1027',
      customerName: 'Carla Reyes',
      customerEmail: 'carla@example.com',
      appliance: 'Refrigerator (Panasonic)',
      issue: 'Freezer not freezing, food spoiling',
      preferredDate: 'June 15, 2026',
      preferredTime: '9:00 AM - 11:00 AM',
      location: 'Macasandig, CDO',
      landmark: 'Corpus Christi School',
      status: 'approved',
      submittedOn: 'June 14, 2026',
      priority: 'critical',
      assignedTech: 'Maria Santos'
    },
    {
      id: 'BR-1026',
      customerName: 'David Lim',
      customerEmail: 'david@example.com',
      appliance: 'Electric Fan',
      issue: 'Not turning on at all',
      preferredDate: 'June 13, 2026',
      preferredTime: '3:00 PM - 5:00 PM',
      location: 'Limketkai Center, CDO',
      landmark: 'Near Atrium',
      status: 'rejected',
      submittedOn: 'June 12, 2026',
      priority: 'low',
      rejectionReason: 'Technician fully booked on requested date'
    }
  ];

  const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  const priorityColors = {
    'low': 'bg-slate-100 text-slate-700',
    'medium': 'bg-blue-100 text-blue-700',
    'high': 'bg-orange-100 text-orange-700',
    'critical': 'bg-red-100 text-red-700'
  };

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-700',
    'approved': 'bg-green-100 text-green-700',
    'rejected': 'bg-red-100 text-red-700'
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Booking Review</h1>
          <p className="text-slate-500 mt-2">Review, approve, or reject repair service requests</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by customer or appliance..."
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-0">
        {['pending', 'approved', 'rejected', 'all'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold transition-all capitalize ${
              filter === tab 
                ? 'bg-white text-primary-600 border-x border-t border-slate-200 mb-[-1px]' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-2">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-2">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-2">Rejected</p>
          <p className="text-2xl font-bold text-red-600">
            {bookings.filter(b => b.status === 'rejected').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-2">Total</p>
          <p className="text-2xl font-bold text-primary-600">{bookings.length}</p>
        </div>
      </div>

      {/* Booking Cards */}
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
                      #{booking.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${priorityColors[booking.priority]}`}>
                      {booking.priority}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{booking.customerName}</h3>
                  <p className="text-slate-600 flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {booking.customerEmail}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Submitted on {booking.submittedOn}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Appliance</p>
                    <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-primary-600" />
                      {booking.appliance}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Issue</p>
                    <p className="text-sm text-slate-700">{booking.issue}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Schedule</p>
                    <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary-600" />
                      {booking.preferredDate}
                    </p>
                    <p className="text-sm text-slate-700 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      {booking.preferredTime}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-sm text-slate-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {booking.location}
                    </p>
                    <p className="text-xs text-primary-600">{booking.landmark}</p>
                  </div>
                </div>
              </div>

              {/* Approval Actions */}
              {booking.status === 'pending' && (
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                    <XCircle className="h-5 w-5" />
                    Reject
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                    <CheckCircle2 className="h-5 w-5" />
                    Approve
                  </button>
                </div>
              )}

              {/* Approved Booking */}
              {booking.status === 'approved' && (
                <div className="bg-green-50 rounded-2xl p-6 pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Assigned Technician</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                        {booking.assignedTech.charAt(0)}
                      </div>
                      <p className="font-semibold text-slate-900">{booking.assignedTech}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-primary-600 border border-primary-200 font-medium hover:bg-primary-50 transition-all">
                      <Send className="h-4 w-4" />
                      Notify Customer
                    </button>
                  </div>
                </div>
              )}

              {/* Rejected Booking */}
              {booking.status === 'rejected' && (
                <div className="bg-red-50 rounded-2xl p-6 pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Rejection Reason</p>
                  <p className="text-sm text-red-700">{booking.rejectionReason}</p>
                </div>
              )}
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
              <CheckCircle2 className="h-5 w-5" />
              Admin Control
            </h4>
            <p className="text-primary-100/90">
              Admins have full control - they can review, approve, reject, and assign technicians to bookings.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              CDO Localization
            </h4>
            <p className="text-primary-100/90">
              Realistic Cagayan de Oro locations and landmarks make the system authentic for your panel.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Prioritization
            </h4>
            <p className="text-primary-100/90">
              Priority system ensures critical issues are handled first - perfect for showing efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingReview;
