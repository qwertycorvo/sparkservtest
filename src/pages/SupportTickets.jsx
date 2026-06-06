import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  MessageSquare,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SupportTickets = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  
  // Mock dataset based on the requirements
  const [tickets, setTickets] = useState([
    { 
      id: 'TKT-1001', 
      customerName: 'Jane Customer', 
      customerEmail: 'jane@example.com',
      subject: 'Washing Machine Installation Query',
      type: 'Product Inquiry',
      priority: 'Medium',
      status: 'Open',
      channel: 'Chat',
      dateCreated: '2024-06-05',
      productPurchased: 'LG Smart Washer'
    },
    { 
      id: 'TKT-1002', 
      customerName: 'John Doe', 
      customerEmail: 'john.d@example.com',
      subject: 'Billing discrepancy for last repair',
      type: 'Billing Inquiry',
      priority: 'High',
      status: 'Pending',
      channel: 'Email',
      dateCreated: '2024-06-04',
      productPurchased: 'Samsung Inverter AC'
    },
    { 
      id: 'TKT-1003', 
      customerName: 'Maria Santos', 
      customerEmail: 'maria.s@example.com',
      subject: 'Fridge not cooling properly after service',
      type: 'Technical Issue',
      priority: 'Critical',
      status: 'Open',
      channel: 'Phone',
      dateCreated: '2024-06-06',
      productPurchased: 'Panasonic Refrigerator'
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    type: 'Technical Issue',
    priority: 'Low',
    channel: 'Chat'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticket = {
      id: `TKT-${1000 + tickets.length + 1}`,
      customerName: user.name,
      customerEmail: user.email,
      ...newTicket,
      status: 'Open',
      dateCreated: new Date().toISOString().split('T')[0],
      productPurchased: 'None'
    };
    setTickets([ticket, ...tickets]);
    setShowForm(false);
    setNewTicket({ subject: '', description: '', type: 'Technical Issue', priority: 'Low', channel: 'Chat' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Support Tickets</h1>
          <p className="text-slate-500 mt-2">Manage customer inquiries and support requests.</p>
        </div>
        {user?.role === 'customer' && (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-200"
          >
            <Plus className="h-5 w-5" />
            New Ticket
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl border border-primary-100 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold mb-6">Create New Support Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Ticket Subject</label>
                <input 
                  type="text" 
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                  placeholder="Summary of the issue"
                  value={newTicket.subject}
                  onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Ticket Type</label>
                <select 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                  value={newTicket.type}
                  onChange={e => setNewTicket({...newTicket, type: e.target.value})}
                >
                  <option>Technical Issue</option>
                  <option>Billing Inquiry</option>
                  <option>Product Inquiry</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Detailed Description</label>
              <textarea 
                required
                className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                placeholder="Describe your issue in detail..."
                value={newTicket.description}
                onChange={e => setNewTicket({...newTicket, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Priority</label>
                <select 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                  value={newTicket.priority}
                  onChange={e => setNewTicket({...newTicket, priority: e.target.value})}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Channel</label>
                <select 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 transition-all"
                  value={newTicket.channel}
                  onChange={e => setNewTicket({...newTicket, channel: e.target.value})}
                >
                  <option>Chat</option>
                  <option>Email</option>
                  <option>Phone</option>
                  <option>Social Media</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tickets by ID, subject or customer..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Ticket</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type & Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{ticket.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-primary-600 uppercase bg-primary-50 px-2 py-0.5 rounded">
                        {ticket.id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {ticket.dateCreated}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">{ticket.customerName}</p>
                    <p className="text-xs text-slate-500">{ticket.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        <Tag className="h-3 w-3" />
                        {ticket.type}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit uppercase tracking-wider ${
                        ticket.priority === 'Critical' ? 'bg-red-100 text-red-600' :
                        ticket.priority === 'High' ? 'bg-orange-100 text-orange-600' :
                        ticket.priority === 'Medium' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {ticket.status === 'Open' ? <AlertCircle className="h-4 w-4 text-primary-500" /> : 
                       ticket.status === 'Pending' ? <Clock className="h-4 w-4 text-orange-500" /> : 
                       <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      <span className="text-sm font-medium text-slate-700">{ticket.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
