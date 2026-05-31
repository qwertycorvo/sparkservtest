import React, { useState } from 'react';
import { 
  CreditCard, 
  History, 
  CheckCircle2, 
  Clock, 
  Search,
  ArrowUpRight,
  Plus
} from 'lucide-react';

const Payments = () => {
  const [transactions, setTransactions] = useState([
    { id: 'TXN-9021', customer: 'Alice Smith', job: 'SR-1025', amount: 'P 1,500', method: 'GCash', reference: '900213345', status: 'Confirmed', date: '2024-06-01' },
    { id: 'TXN-9022', customer: 'Bob Wilson', job: 'SR-1021', amount: 'P 850', method: 'GCash', reference: '900214456', status: 'Pending', date: '2024-06-01' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments & GCash</h1>
          <p className="text-slate-500 mt-2">Monitor service transactions and confirm GCash reference numbers.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-200">
          <Plus className="h-5 w-5" />
          Log Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Revenue</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">P 42,850</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Pending GCash</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">5 Transactions</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Service Fees (Admin)</p>
          <p className="text-2xl font-bold text-primary-600 mt-1">P 6,427</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by reference or customer..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">GCash Reference</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{txn.customer}</p>
                    <p className="text-xs text-slate-500">Job: {txn.job}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <code className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-700">{txn.reference}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      txn.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 hover:text-primary-700 font-bold text-sm">
                      Confirm
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

export default Payments;
