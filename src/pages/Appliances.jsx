import React, { useState } from 'react';
import { 
  Plus, 
  Wrench, 
  Trash2, 
  History, 
  CheckCircle2, 
  Info,
  Refrigerator,
  Tv,
  Fan,
  Microwave
} from 'lucide-react';

const Appliances = () => {
  const [appliances, setAppliances] = useState([
    { id: 1, name: 'Samsung Inverter AC', category: 'AC', brand: 'Samsung', model: 'AR12TY', condition: 'Good', icon: Fan },
    { id: 2, name: 'LG Smart Fridge', category: 'Refrigerator', brand: 'LG', model: 'GR-B247', condition: 'Repair Needed', icon: Refrigerator },
  ]);

  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Appliances</h1>
          <p className="text-slate-500 mt-2">Manage your registered appliances and their repair history.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
        >
          <Plus className="h-5 w-5" />
          Add Appliance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {appliances.map((app) => (
          <div key={app.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                <app.icon className="h-8 w-8" />
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                app.condition === 'Good' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
              }`}>
                {app.condition}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900">{app.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{app.brand} • {app.model}</p>

            <div className="mt-8 flex items-center gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors">
                <History className="h-4 w-4" />
                History
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-50 text-primary-700 text-sm font-bold hover:bg-primary-100 transition-colors">
                <Wrench className="h-4 w-4" />
                Repair
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {appliances.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Wrench className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No appliances found</h3>
          <p className="text-slate-500 mt-2">Register your first appliance to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Appliances;
