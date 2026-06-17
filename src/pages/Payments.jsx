import React, { useState } from 'react';
import { 
  CreditCard, 
  History, 
  CheckCircle2, 
  Clock, 
  Search,
  Plus,
  Upload,
  FileText,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const Payments = () => {
  const { transactions, confirmPayment } = useData();
  const { user } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    referenceNumber: '',
  });

  const handleConfirmPayment = (txnId) => {
    confirmPayment(txnId);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-500 mt-2">Manage transactions and payment verifications</p>
        </div>
        {user.role === 'customer' && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all"
          >
            <Upload className="h-5 w-5" />
            Upload Payment
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Transactions</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{transactions.length}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Pending Verification</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {transactions.filter(t => t.status === 'pending_verification').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Confirmed Payments</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {transactions.filter(t => t.status === 'confirmed').length}
          </p>
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Job</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Reference #</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                {(user.role === 'admin' || user.role === 'system_admin') && (
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map(txn => (
                <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{txn.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{txn.customer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-600">{txn.job}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <code className="bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-700">{txn.referenceNumber}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      txn.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {txn.status === 'confirmed' ? 'Confirmed' : 'Pending Verification'}
                    </span>
                  </td>
                  {(user.role === 'admin' || user.role === 'system_admin') && (
                    <td className="px-6 py-4 text-right">
                      {txn.status === 'pending_verification' && (
                        <button
                          onClick={() => handleConfirmPayment(txn.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition-all flex items-center gap-2 ml-auto"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Confirm
                        </button>
                      )}
                      {txn.status === 'confirmed' && (
                        <span className="text-green-600 text-sm font-bold flex items-center gap-1 justify-end">
                          <CheckCircle2 className="h-4 w-4" />
                          Verified
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Payment Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Upload Payment Proof</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">GCash Reference Number</label>
                <input
                  type="text"
                  placeholder="Enter reference number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-primary-500 focus:bg-white transition-all"
                  value={uploadData.referenceNumber}
                  onChange={(e) => setUploadData({ ...uploadData, referenceNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Upload Receipt (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Click to upload receipt</p>
                  <p className="text-sm text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    alert('Payment proof uploaded successfully! Waiting for admin verification.');
                  }}
                  disabled={!uploadData.referenceNumber}
                  className="flex-[2] bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 disabled:opacity-50 transition-all"
                >
                  <FileText className="h-5 w-5" />
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
