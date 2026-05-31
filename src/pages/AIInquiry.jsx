import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Wrench
} from 'lucide-react';

const AIInquiry = () => {
  const [symptom, setSymptom] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        causes: [
          'Faulty drive belt',
          'Worn out motor brushes',
          'Control board malfunction'
        ],
        troubleshooting: [
          'Check if the appliance is plugged in correctly',
          'Ensure the door is fully closed and latched',
          'Try a hard reset by unplugging for 5 minutes'
        ],
        recommendation: 'Based on the symptoms, a mechanical component might be failing. We recommend booking a technician for a professional diagnostic.'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary-600" />
          AI Repair Assistant
        </h1>
        <p className="text-slate-500 mt-2">Describe your appliance symptoms and let our AI provide instant insights.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              What seems to be the problem?
            </label>
            <textarea
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder="e.g., My washing machine is making a loud banging noise during the spin cycle..."
              className="w-full h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none ring-primary-500/20 transition-all focus:border-primary-500 focus:bg-white focus:ring-4"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
            Analyze Symptoms
          </button>
        </form>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
            <h3 className="text-lg font-bold text-orange-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5" />
              Possible Causes
            </h3>
            <ul className="space-y-3">
              {result.causes.map((cause, i) => (
                <li key={i} className="flex items-center gap-3 text-orange-800">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {cause}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
            <h3 className="text-lg font-bold text-green-900 flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              Troubleshooting
            </h3>
            <ul className="space-y-3">
              {result.troubleshooting.map((tip, i) => (
                <li key={i} className="flex items-center gap-3 text-green-800">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 bg-primary-600 p-8 rounded-3xl text-white shadow-xl shadow-primary-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">AI Recommendation</h3>
              <p className="text-primary-100">{result.recommendation}</p>
            </div>
            <button className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-50 transition-colors whitespace-nowrap">
              Book Technician Now
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInquiry;
