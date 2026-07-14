import React, { useState, useEffect } from 'react';
import { Settings, Save } from 'lucide-react';
import { useData } from '../context/DataContext';

const SystemConfig = () => {
  const { systemConfig, updateSystemConfig } = useData();
  const [formData, setFormData] = useState(systemConfig);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSystemConfig(formData);
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary-100 rounded-2xl">
          <Settings className="h-8 w-8 text-primary-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Configuration</h1>
          <p className="text-slate-500 mt-2">Define access control and manage system settings.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={formData.maintenanceMode}
                  onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                Maintenance Mode
              </label>
              <p className="text-xs text-slate-500">Put the system in maintenance mode</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={formData.allowNewRegistrations}
                  onChange={(e) => setFormData({ ...formData, allowNewRegistrations: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                Allow New Registrations
              </label>
              <p className="text-xs text-slate-500">Allow new users to register</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Default Currency</label>
              <select 
                value={formData.defaultCurrency}
                onChange={(e) => setFormData({ ...formData, defaultCurrency: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary-500 focus:bg-white transition-all"
              >
                <option value="PHP">PHP (Philippine Peso)</option>
                <option value="USD">USD (US Dollar)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Max File Size (MB)</label>
              <input 
                type="number"
                value={formData.maxFileSizeMB}
                onChange={(e) => setFormData({ ...formData, maxFileSizeMB: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Session Timeout (Minutes)</label>
              <input 
                type="number"
                value={formData.sessionTimeoutMinutes}
                onChange={(e) => setFormData({ ...formData, sessionTimeoutMinutes: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
            >
              <Save className="h-5 w-5" />
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SystemConfig;