import React, { useState } from 'react';
import {
  Bot,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  CalendarDays,
  CheckCircle2,
  XCircle,
  ArrowRight,
  DollarSign,
  ListChecks,
  Home,
  Clock,
} from 'lucide-react';

const applianceOptions = [
  'Washing Machine',
  'Refrigerator',
  'Dishwasher',
  'Dryer',
  'Oven / Stove',
  'Water Heater',
  'Air Conditioner',
  'Other Appliance',
];

const issueLibrary = [
  {
    appliance: 'Washing Machine',
    category: 'Noise during spin',
    keywords: ['noise', 'bang', 'clank', 'rumble', 'vibration'],
    diagnosis:
      'Most likely imbalance or loose components inside the drum, which can strain the motor and bearings.',
    steps: [
      'Remove heavy or unbalanced loads and redistribute items evenly.',
      'Check the drum for loose objects such as coins or buttons.',
      'Confirm the machine is level on the floor and adjust its feet.',
      'Tighten any visible fasteners around the drum area.',
      'Run a short spin-only cycle to verify the sound is gone.',
    ],
    severity: 'moderate',
  },
  {
    appliance: 'Washing Machine',
    category: 'Water leak',
    keywords: ['leak', 'drip', 'water', 'flood', 'wet'],
    diagnosis:
      'A leaking washing machine is usually caused by a damaged hose, loose connection, or worn door seal.',
    steps: [
      'Inspect the inlet and drain hoses for cracks or loose fittings.',
      'Tighten hose clamps and connection points.',
      'Check the door seal for tears or debris that prevents a proper seal.',
      'Run a short cycle and observe the machine for any water escape.',
      'Replace damaged hoses or seals before using the appliance again.',
    ],
    severity: 'moderate',
  },
  {
    appliance: 'Refrigerator',
    category: 'Not cooling',
    keywords: ['warm', 'not cold', 'hot', 'temperature', 'defrost'],
    diagnosis:
      'The refrigerator may have a blocked airflow path, dirty condenser, or an aging compressor.',
    steps: [
      'Verify the thermostat setting is correct and the door is fully closed.',
      'Clean dust from the condenser coils and remove obstructions.',
      'Check that vents inside the fridge are not blocked by items.',
      'Listen for the compressor and fan operation during the cooling cycle.',
      'Allow 24 hours after restocking before concluding the issue.',
    ],
    severity: 'major',
  },
  {
    appliance: 'Dishwasher',
    category: 'Poor cleaning',
    keywords: ['dirty', 'stains', 'not clean', 'spotting', 'film'],
    diagnosis:
      'Poor dishwasher performance is often caused by clogged spray arms, a blocked filter, or hard water buildup.',
    steps: [
      'Remove and clean the spray arms under warm water.',
      'Empty and rinse the dishwasher filter assembly.',
      'Use a dishwasher cleaner or vinegar cycle to remove buildup.',
      'Ensure the detergent dispenser is opening correctly.',
      'Avoid overloading the rack and position items for proper water flow.',
    ],
    severity: 'minor',
  },
  {
    appliance: 'Oven / Stove',
    category: 'Not heating',
    keywords: ['not heating', 'cold', 'no heat', 'won\'t heat', 'no power'],
    diagnosis:
      'A non-heating oven may have an issue with the heating element, igniter, or internal control sensor.',
    steps: [
      'Confirm the appliance is plugged in and the breaker is on.',
      'Check that the temperature is set correctly and the timer is off.',
      'Inspect the bake or broil element for visible damage.',
      'Try a different cooking mode such as broil or bake.',
      'Allow the appliance to complete a full warm-up cycle.',
    ],
    severity: 'major',
  },
  {
    appliance: 'Air Conditioner',
    category: 'Weak airflow',
    keywords: ['weak', 'low airflow', 'not blowing', 'cooling slowly'],
    diagnosis:
      'Weak AC airflow can be caused by a clogged filter, blocked vents, or condenser fan problems.',
    steps: [
      'Replace or clean the air filter and remove dust buildup.',
      'Inspect register vents and remove any obstructions.',
      'Ensure the outdoor condenser unit is clear of debris.',
      'Confirm the fan is spinning smoothly when the unit is running.',
      'Reset the thermostat and test the cooling performance again.',
    ],
    severity: 'moderate',
  },
  {
    appliance: 'Water Heater',
    category: 'No hot water',
    keywords: ['cold', 'no hot', 'lukewarm', 'temperature'],
    diagnosis:
      'No hot water is usually related to a faulty heating element, thermostat, or gas ignition system.',
    steps: [
      'Check the temperature setting on the water heater control.',
      'Inspect for any error indicator lights or unusual sounds.',
      'Flush the tank to remove sediment buildup.',
      'Reset the unit according to the manufacturer instructions.',
      'Test hot water at several fixtures after a full recovery period.',
    ],
    severity: 'major',
  },
  {
    appliance: 'Dryer',
    category: 'Not tumbling',
    keywords: ['not tumbling', 'won\'t spin', 'stuck', 'drum'],
    diagnosis:
      'A dryer that does not tumble may have a broken belt, door switch issue, or motor problem.',
    steps: [
      'Make sure the door is fully closed and the cycle is selected correctly.',
      'Listen for the motor trying to engage when you start the dryer.',
      'Inspect the drum for signs of obstruction or binding.',
      'Clean the lint trap and exhaust vent.',
      'Try a short cycle with a small load to verify movement.',
    ],
    severity: 'moderate',
  },
  {
    appliance: 'Other Appliance',
    category: 'General appliance issue',
    keywords: ['problem', 'issue', 'broken', 'not working', 'error'],
    diagnosis:
      'We are identifying the best repair strategy based on the symptoms you provided.',
    steps: [
      'Describe the issue clearly with any sound, smell, or behavior ',
      'Confirm the appliance is plugged in and powered correctly.',
      'Restart the appliance and observe the behavior closely.',
      'Note any error codes or indicator lights that appear.',
      'Avoid using the appliance if it creates smoke or sparks.',
    ],
    severity: 'minor',
  },
];

const costProfiles = {
  minor: {
    diagnosisFee: 2200,
    laborMin: 3400,
    laborMax: 5100,
    partsMin: 1100,
    partsMax: 2800,
  },
  moderate: {
    diagnosisFee: 2800,
    laborMin: 5100,
    laborMax: 8000,
    partsMin: 2800,
    partsMax: 6800,
  },
  major: {
    diagnosisFee: 3400,
    laborMin: 6800,
    laborMax: 12500,
    partsMin: 4500,
    partsMax: 12500,
  },
};

const analyzeIssue = (appliance, description) => {
  const normalized = description.trim().toLowerCase();
  const match = issueLibrary.find(
    (item) =>
      item.appliance === appliance &&
      item.keywords.some((keyword) => normalized.includes(keyword))
  );

  const fallback =
    issueLibrary.find((item) => item.appliance === appliance) ||
    issueLibrary.find((item) => item.appliance === 'Other Appliance');

  const issue = match || fallback;
  const costs = costProfiles[issue.severity] || costProfiles.moderate;
  const totalMin = costs.diagnosisFee + costs.laborMin + costs.partsMin;
  const totalMax = costs.diagnosisFee + costs.laborMax + costs.partsMax;

  return {
    appliance,
    diagnosis: issue.diagnosis,
    category: issue.category,
    troubleshooting: issue.steps,
    costs: {
      ...costs,
      totalMin,
      totalMax,
    },
  };
};

const costBadge = (label, value) => {
  let displayValue;
  if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
    // Handle range object
    displayValue = `₱${value.min.toLocaleString()} - ₱${value.max.toLocaleString()}`;
  } else if (typeof value === 'number') {
    // Handle single number
    displayValue = `₱${value.toLocaleString()}`;
  } else {
    // Fallback for other formats
    displayValue = value;
  }

  return (
    <div className="rounded-3xl bg-slate-50 p-4 border border-slate-100 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-semibold text-slate-900">{displayValue}</p>
    </div>
  );
};

const ServiceInquiry = () => {
  const [appliance, setAppliance] = useState('Washing Machine');
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [resolved, setResolved] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    address: '',
    schedule: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setAnalysis(analyzeIssue(appliance, description));
    setResolved(null);
    setBookingOpen(false);
    setBookingComplete(false);
  };

  const handleResolved = (answer) => {
    setResolved(answer === 'yes');
    if (answer === 'yes') {
      setBookingOpen(false);
    }
  };

  const handleBook = () => {
    setBookingOpen(true);
    setBookingComplete(false);
  };

  const handleBookingChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    if (!bookingData.name || !bookingData.address || !bookingData.schedule) {
      return;
    }
    setBookingComplete(true);
    setBookingOpen(false);
  };

  const resetFlow = () => {
    setDescription('');
    setAnalysis(null);
    setResolved(null);
    setBookingOpen(false);
    setBookingComplete(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr]">
        <section className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 text-slate-900">
            <Search className="h-5 w-5 text-primary-600" />
            <h2 className="text-2xl font-semibold">Tell us about the issue</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Appliance type
                <select
                  value={appliance}
                  onChange={(e) => setAppliance(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white"
                >
                  {applianceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="space-y-2 text-sm font-medium text-slate-700">
                <span>Preferred schedule</span>
                <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                  <CalendarDays className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-500">Select a time later in the booking step</span>
                </div>
              </div>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Problem description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="e.g. My refrigerator is running constantly and the interior stays warm..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white"
                required
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-primary-600 px-6 py-4 text-white font-semibold shadow-lg shadow-primary-500/20 transition hover:bg-primary-700"
              >
                <Sparkles className="h-5 w-5" />
                Analyze Issue
              </button>
              <button
                type="button"
                onClick={resetFlow}
                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-6 py-4 text-slate-700 transition hover:bg-slate-50"
              >
                Reset Inquiry
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 text-slate-900 mb-4">
              <Wrench className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold">Why this helps</h3>
            </div>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3 leading-7">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary-600" />
                Diagnose likely causes quickly and avoid unnecessary service calls.
              </li>
              <li className="flex gap-3 leading-7">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary-600" />
                Apply step-by-step troubleshooting with a clear handoff to booking if the fix does not work.
              </li>
              <li className="flex gap-3 leading-7">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary-600" />
                Provide realistic cost estimates to set expectations before the technician visit.
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {analysis && (
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 text-slate-900 mb-4">
                <Search className="h-5 w-5 text-primary-600" />
                <h2 className="text-2xl font-semibold">Diagnosis</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-50 p-5 border border-slate-100">
                  <p className="text-sm text-slate-500 uppercase tracking-[0.25em]">Appliance</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">{analysis.appliance}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 border border-slate-100">
                  <p className="text-sm text-slate-500 uppercase tracking-[0.25em]">Likely cause</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{analysis.category}</p>
                  <p className="mt-3 text-slate-600 leading-7">{analysis.diagnosis}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 text-slate-900 mb-4">
                <ListChecks className="h-5 w-5 text-primary-600" />
                <h2 className="text-2xl font-semibold">Quick summary</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {costBadge('Diagnosis fee', analysis.costs.diagnosisFee)}
                {costBadge('Labor range', { min: analysis.costs.laborMin, max: analysis.costs.laborMax })}
                {costBadge('Parts estimate', { min: analysis.costs.partsMin, max: analysis.costs.partsMax })}
                {costBadge('Estimated total', { min: analysis.costs.totalMin, max: analysis.costs.totalMax })}
              </div>
            </section>
          </div>

          <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 text-slate-900 mb-4">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <h2 className="text-2xl font-semibold">Troubleshooting</h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 leading-7">
                Follow these step-by-step actions before deciding whether to request a service visit.
              </p>
              <ol className="space-y-3">
                {analysis.troubleshooting.map((step, index) => (
                  <li key={index} className="flex gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-slate-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-slate-500 uppercase tracking-[0.25em] text-xs">Issue status</p>
                <h3 className="text-xl font-semibold text-slate-900">Did this fix your issue?</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleResolved('yes')}
                  className="inline-flex items-center gap-2 rounded-3xl bg-emerald-600 px-6 py-3 text-white font-semibold transition hover:bg-emerald-700"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleResolved('no')}
                  className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-6 py-3 text-slate-700 font-semibold transition hover:bg-slate-50"
                >
                  <XCircle className="h-5 w-5 text-slate-600" />
                  No
                </button>
              </div>
            </div>
          </section>

          {resolved === true && (
            <section className="rounded-[2rem] bg-emerald-600 p-8 shadow-xl shadow-emerald-500/20 text-white border border-emerald-500">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-10 w-10 text-white" />
                <div>
                  <h3 className="text-2xl font-semibold">Success!</h3>
                  <p className="mt-2 text-slate-100 leading-7">
                    Great news — you fixed the issue without a service visit. If anything else comes up, return to the Service Inquiry anytime.
                  </p>
                </div>
              </div>
            </section>
          )}

          {resolved === false && (
            <section className="rounded-[2rem] bg-slate-50 p-8 shadow-sm border border-slate-200">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-900">
                  <DollarSign className="h-5 w-5 text-primary-600" />
                  <h2 className="text-2xl font-semibold">Estimated Repair Cost</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  {costBadge('Diagnosis fee', analysis.costs.diagnosisFee)}
                  {costBadge('Labor range', { min: analysis.costs.laborMin, max: analysis.costs.laborMax })}
                  {costBadge('Parts estimate', { min: analysis.costs.partsMin, max: analysis.costs.partsMax })}
                  {costBadge('Total range', { min: analysis.costs.totalMin, max: analysis.costs.totalMax })}
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-slate-600 leading-7">
                    These figures are based on common repair scenarios for your selected appliance. Your final quote will be confirmed after technician inspection.
                  </p>
                  <button
                    type="button"
                    onClick={handleBook}
                    className="inline-flex items-center gap-2 rounded-3xl bg-primary-600 px-6 py-4 text-white font-semibold shadow-lg shadow-primary-500/20 transition hover:bg-primary-700"
                  >
                    Book Technician
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {bookingOpen && !bookingComplete && (
            <section className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 text-slate-900 mb-4">
                <CalendarDays className="h-5 w-5 text-primary-600" />
                <h2 className="text-2xl font-semibold">Book Technician</h2>
              </div>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Name
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => handleBookingChange('name', e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white"
                      required
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Preferred schedule
                    <input
                      type="datetime-local"
                      value={bookingData.schedule}
                      onChange={(e) => handleBookingChange('schedule', e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white"
                      required
                    />
                  </label>
                </div>
                <label className="space-y-2 text-sm font-medium text-slate-700 block">
                  Address
                  <textarea
                    value={bookingData.address}
                    onChange={(e) => handleBookingChange('address', e.target.value)}
                    rows={3}
                    placeholder="Service address"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-3xl bg-primary-600 px-6 py-4 text-white font-semibold shadow-lg shadow-primary-500/20 transition hover:bg-primary-700"
                >
                  Confirm Booking
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </section>
          )}

          {bookingComplete && (
            <section className="rounded-[2rem] bg-emerald-600 p-8 shadow-xl shadow-emerald-500/20 text-white border border-emerald-500">
              <div className="flex items-start gap-4">
                <Home className="h-10 w-10 text-white" />
                <div>
                  <h3 className="text-2xl font-semibold">Booking confirmed</h3>
                  <p className="mt-2 leading-7 text-slate-100">
                    Your technician is on the way. We have scheduled service at <span className="font-semibold">{new Date(bookingData.schedule).toLocaleString()}</span>.
                    You will receive confirmation of the visit details shortly.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceInquiry;
