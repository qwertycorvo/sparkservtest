import React, { useState } from 'react';
import { HelpCircle, ArrowRight, CheckCircle2, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const TroubleshootingGuide = () => {
  const navigate = useNavigate();
  const { applianceTypes, commonProblems } = useData();
  
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Troubleshooting Guide</h1>
          <p className="text-slate-500 mt-2">Try these steps before requesting a repair</p>
        </div>
        <button
          onClick={() => navigate('/request')}
          className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all"
        >
          <PlusCircle className="h-5 w-5" />
          Request Repair
        </button>
      </div>

      {/* Step 1: Select Appliance */}
      {!selectedAppliance && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Step 1: Select your appliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applianceTypes.map(appliance => (
              <button
                key={appliance.id}
                onClick={() => setSelectedAppliance(appliance)}
                className="p-6 rounded-2xl border-2 border-slate-100 hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
              >
                <div className="text-2xl font-bold text-slate-900">{appliance.name}</div>
                <div className="text-sm text-slate-500 mt-1">Category: {appliance.category}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Problem */}
      {selectedAppliance && !selectedProblem && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSelectedAppliance(null)}
              className="text-primary-600 font-bold hover:underline"
            >
              ← Back
            </button>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Step 2: What's the problem?</h2>
          <div className="space-y-4">
            {(commonProblems[selectedAppliance.name] || []).map(problem => (
              <button
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className="w-full p-6 rounded-2xl border-2 border-slate-100 hover:border-primary-500 hover:bg-primary-50 transition-all text-left flex items-center gap-4"
              >
                <HelpCircle className="h-8 w-8 text-primary-600" />
                <div>
                  <div className="font-bold text-slate-900">{problem.name}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 ml-auto" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Show Troubleshooting Tips */}
      {selectedAppliance && selectedProblem && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSelectedProblem(null)}
              className="text-primary-600 font-bold hover:underline"
            >
              ← Back
            </button>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Try these steps:</h2>
          <p className="text-slate-500 mb-6">Appliance: {selectedAppliance.name} | Problem: {selectedProblem.name}</p>
          
          <div className="space-y-4 mb-8">
            {selectedProblem.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                  {index + 1}
                </div>
                <div className="text-slate-900 font-medium">{tip}</div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900">Still having issues?</h3>
                <p className="text-slate-600 mt-1">If these steps didn't resolve your problem, we recommend requesting a repair from one of our certified technicians.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/request')}
            className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
          >
            <PlusCircle className="h-5 w-5" />
            Request a Repair
          </button>
        </div>
      )}
    </div>
  );
};

export default TroubleshootingGuide;
