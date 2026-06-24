import React, { useState, useRef, useEffect } from 'react';
import { Send, PlusCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

/* KNOWLEDGE BASE (10+ ISSUES, ENGLISH + BISAYA) */
const kb = {
  spin: {
    en: "Spin issue usually caused by overload, imbalance, or motor/belt problems.",
    bis: "Kasagaran spin problem tungod sa overload, imbalance, o motor/belt issue.",
    steps: [
      "Check load balance",
      "Make sure door is fully closed",
      "Remove excess clothes",
      "Check drum alignment",
      "Inspect motor/belt",
      "Unplug for 1 minute",
      "Restart spin cycle",
      "Check error code",
      "Test empty cycle"
    ],
    bis_steps: [
      "Siguroha nga sakto ang kabug-aton sa sulod",
      "Siguroha nga sirado ang pultahan",
      "Tanggalon ang sobra nga sinina",
      "Check ang drum alignment",
      "I-check ang motor o belt",
      "I-unplug sulod 1 minute",
      "I-restart ang spin cycle",
      "Tan-awa ang error code",
      "Testinga ang empty cycle"
    ]
  },
  smell: {
    en: "Bad smell is usually caused by mold buildup or dirty drum.",
    bis: "Ang baho kasagaran tungod sa mold o hugaw nga drum.",
    steps: [
      "Run hot water + vinegar cycle",
      "Clean rubber seal",
      "Clean detergent drawer",
      "Leave door open",
      "Run empty wash cycle",
      "Use baking soda if needed",
      "Clean filter",
      "Check moisture buildup",
      "Repeat cleaning weekly"
    ],
    bis_steps: [
      "Ipa-run ug init nga tubig + suka cycle",
      "Limpyohi ang rubber seal",
      "Limpyohi ang detergent drawer",
      "Ibuka ang pultahan human maglaba",
      "Ipa-run ug walay sulod nga wash cycle",
      "Gamit ug baking soda kung kinahanglan",
      "Limpyohi ang filter",
      "I-check kung naay moisture buildup",
      "Buhata ang cleaning kada semana"
    ]
  },
  drain: {
    en: "Drain issue is caused by clogged hose or filter blockage.",
    bis: "Drain problem tungod sa bara nga hose o filter.",
    steps: [
      "Check drain hose for blockages",
      "Clean drain filter",
      "Make sure hose is not bent",
      "Run drain cycle again",
      "Check pump area",
      "Remove debris",
      "Inspect coin trap",
      "Reset machine",
      "Test drain mode"
    ],
    bis_steps: [
      "Tan-awa kung naay bara ang hose",
      "Limpyohi ang drain filter",
      "Siguroha nga dili baliko ang hose",
      "I-run balik ang drain cycle",
      "Check ang pump area",
      "Tanggalon ang hugaw o debris",
      "I-check ang coin trap",
      "I-reset ang machine",
      "Testi ang drain mode"
    ]
  },
  no_power: {
    en: "No power may be due to plug, breaker, or outlet issues.",
    bis: "Walay kuryente tungod sa plug, breaker, o saksakan.",
    steps: [
      "Check power cord",
      "Check outlet",
      "Check breaker switch",
      "Try another socket",
      "Inspect plug damage",
      "Reset breaker",
      "Wait 1 minute then retry",
      "Check fuse",
      "Test power button"
    ],
    bis_steps: [
      "Tan-awa ang power cord",
      "Check ang saksakan",
      "Tan-awa ang breaker switch",
      "Sulayi ug laing outlet",
      "Check kung guba ang plug",
      "I-reset ang breaker",
      "Hulat 1 minuto dayon suwayi balik",
      "Check fuse",
      "Testi ang power button"
    ]
  },
  leak: {
    en: "Water leak caused by hose damage or loose connection.",
    bis: "Tulo sa tubig tungod sa hose damage o luag nga connection.",
    steps: [
      "Check inlet hose",
      "Check drain hose",
      "Tighten connections",
      "Inspect rubber seal",
      "Check drum cracks",
      "Clean overflow area",
      "Test water flow",
      "Replace damaged hose",
      "Dry area and retest"
    ],
    bis_steps: [
      "Check inlet hose",
      "Check drain hose",
      "Hugti ang connections",
      "Tan-awa ang rubber seal",
      "Check kung naay cracks sa drum",
      "Limpyohi ang overflow area",
      "Testi ang water flow",
      "Ilisi ang guba nga hose",
      "Patya ug suwayi balik"
    ]
  },
  noise: {
    en: "Noise usually caused by loose objects or worn bearings.",
    bis: "Saba tungod sa loose objects o worn bearings.",
    steps: [
      "Check inside drum",
      "Remove foreign objects",
      "Check bearings",
      "Balance load",
      "Reduce overload",
      "Inspect motor area",
      "Check leveling",
      "Run test cycle",
      "Listen for vibration source"
    ],
    bis_steps: [
      "Tan-awa sulod sa drum",
      "Tanggalon ang mga butang",
      "Check bearings",
      "Balance ang load",
      "Likayi ang overload",
      "Check motor area",
      "Siguroha nga level ang machine",
      "Testi ang cycle",
      "Pamati kung asa ang vibration"
    ]
  },
  vibration: {
    en: "Excess vibration caused by uneven floor or overload.",
    bis: "Kurog tungod sa uneven floor o overload.",
    steps: [
      "Level the machine",
      "Reduce load",
      "Balance clothes",
      "Check feet adjustment",
      "Place on flat surface",
      "Inspect shock absorbers",
      "Run spin test",
      "Check drum alignment",
      "Secure machine position"
    ],
    bis_steps: [
      "I-level ang machine",
      "Pagminus sa load",
      "Balance ang sinina",
      "Check ang feet adjustment",
      "Ibutang sa flat nga lugar",
      "Check shock absorbers",
      "Testi ang spin",
      "Check drum alignment",
      "Siguroha stable ang machine"
    ]
  },
  door_issue: {
    en: "Door issue caused by latch failure or obstruction.",
    bis: "Door problem tungod sa lock failure o bara.",
    steps: [
      "Check door latch",
      "Remove obstruction",
      "Clean lock area",
      "Close door properly",
      "Check seal rubber",
      "Test locking mechanism",
      "Reset machine",
      "Inspect hinge",
      "Try restart cycle"
    ],
    bis_steps: [
      "Check door latch",
      "Tanggalon ang bara",
      "Limpyohi ang lock area",
      "Sirad-i tarong ang pultahan",
      "Check rubber seal",
      "Testi ang locking mechanism",
      "I-reset ang machine",
      "Check hinge",
      "Restart cycle"
    ]
  },
  water_not_filling: {
    en: "Water not filling caused by low pressure or inlet blockage.",
    bis: "Walay tubig tungod sa gamay pressure o bara inlet hose.",
    steps: [
      "Check water supply",
      "Check inlet hose",
      "Clean filter screen",
      "Check valve",
      "Make sure tap is open",
      "Inspect hose kink",
      "Test water flow",
      "Reset machine",
      "Check pressure"
    ],
    bis_steps: [
      "Check water supply",
      "Check inlet hose",
      "Limpyohi ang filter screen",
      "Check valve",
      "Siguroha nga bukas ang gripo",
      "Check kung nagkakink ang hose",
      "Testi ang water flow",
      "I-reset ang machine",
      "Check pressure"
    ]
  },
  error_code: {
    en: "Error codes indicate internal system or sensor issues.",
    bis: "Error code nagpasabot ug internal sensor o system issue.",
    steps: [
      "Note error code",
      "Check manual",
      "Restart machine",
      "Unplug for 1 minute",
      "Check connections",
      "Clean sensors",
      "Reset system",
      "Run test cycle",
      "Observe behavior"
    ],
    bis_steps: [
      "I-note ang error code",
      "Check manual",
      "Restart machine",
      "I-unplug sulod 1 minute",
      "Check connections",
      "Limpyohi ang sensors",
      "I-reset ang system",
      "Testi ang cycle",
      "Obserbahi ang behavior"
    ]
  },
  jumping: {
    en: "Jumping issue is caused by imbalance, uneven floor, or shock absorber problem.",
    bis: "Ang paglukso tungod sa imbalance, uneven nga salog, o shock absorber issue.",
    steps: [
      "Check if machine is on flat surface",
      "Level the washing machine",
      "Reduce load",
      "Balance clothes",
      "Check shock absorbers",
      "Make sure feet are stable",
      "Move machine away from wall",
      "Run spin cycle test",
      "Inspect suspension system",
      "If still jumping → technician"
    ],
    bis_steps: [
      "Siguroha nga flat ang salog",
      "I-level ang washing machine",
      "Pagminus sa load",
      "Balance ang sinina",
      "Check shock absorbers",
      "Siguroha stable ang feet",
      "Ilihok palayo sa bungbong",
      "Testi ang spin cycle",
      "Check suspension system",
      "Kung magpadayon → technician"
    ]
  }
};

const TroubleshootingGuide = () => {
  const navigate = useNavigate();
  const { standardPricing, applianceTypes, commonProblems, technicians, repairRequests, submitEstimateRequest, estimates, acceptEstimate, declineEstimate } = useData();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "Hello 👋 I'm your SPARKServ Assistant. How can I help you today? You can ask me about appliance troubleshooting, service pricing, our technicians, and more!"
    }
  ]);
  const [input, setInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [requestForm, setRequestForm] = useState({ appliance: '', problem: '' });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* LANGUAGE DETECTOR (ENGLISH + BISAYA) */
  const getLang = (text) => {
    text = text.toLowerCase();
    const bisWords = ["naay baho", "akong washing machine", "dili mo on", "walay kuryente", "guba", "baho", "tulo", "kurog", "ambak", "ayaw mo on", "naay"];
    const enWords = ["not", "broken", "smell", "why", "help", "fix", "problem", "no power", "error", "spin", "drain", "noise"];
    let bisCount = 0, enCount = 0;
    bisWords.forEach(w => { if (text.includes(w)) bisCount++; });
    enWords.forEach(w => { if (text.includes(w)) enCount++; });
    if (bisCount > enCount && bisCount > 0) return "bis";
    if (enCount > bisCount && enCount > 0) return "en";
    if (text.includes("baho") || text.includes("naay")) return "bis";
    return "en";
  };

  /* ISSUE DETECTOR (MULTILINGUAL) */
  const detectIssue = (text) => {
    text = text.toLowerCase();
    if (text.match(/spin|dili.*spin|not spinning|ayaw spin|nag spin|jump|jumping|kurog|vibration|naglukso/)) return "spin";
    if (text.match(/smell|baho|amoy|odor|mabaho/)) return "smell";
    if (text.match(/drain|di.*ma drain|wala.*drain|tubig.*di mo gawas/)) return "drain";
    if (text.match(/noise|saba|ingay|loud/)) return "noise";
    if (text.match(/no power|walay kuryente|ayaw mo on|dili mo on|dili ga on|di mo on|won't turn on|not turning on|does not turn on|ayaw on/)) return "no_power";
    if (text.match(/leak|tulo|nag tulo/)) return "leak";
    if (text.match(/door|pultahan|dili mo close|dilima sirado/)) return "door_issue";
    if (text.match(/water.*not filling|walay tubig|di mo sulod ang tubig/)) return "water_not_filling";
    if (text.match(/error|code|e0|e1|e2/)) return "error_code";
    return null;
  };

  const isFixed = (text) => text.includes("ok na") || text.includes("fixed") || text.includes("working");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length + 1, role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const text = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let botResponse = "";

      if (isFixed(text)) {
        botResponse = "Nice 👍 Problem solved!";
      } else if (text.includes("technician") || text.includes("repair")) {
        const techList = technicians.filter(t => t.available).map(t => 
          `• <span class="tech" data-name="${t.name}">${t.name}</span> - ${t.expertise.join(', ')}`
        ).join('<br>');
        botResponse = `Here are our available technicians:<br><br>${techList}`;
      } else if (text.includes("price") || text.includes("cost") || text.includes("how much")) {
        let response = "Here are our standard service prices:<br><br>";
        standardPricing.forEach(p => { response += `• ${p.service}: ${p.price}<br>`; });
        botResponse = response;
      } else if (text.includes("appliance") || text.includes("aircon") || text.includes("refrigerator") || text.includes("washing") || text.includes("fan") || text.includes("tv")) {
        let response = "We service the following appliances:<br><br>";
        applianceTypes.forEach(a => { response += `• ${a.name} (${a.category})<br>`; });
        botResponse = response;
      } else if (text.includes("status") || text.includes("track") || text.includes("progress")) {
        if (repairRequests.length > 0) {
          let response = "Your repair requests:<br><br>";
          repairRequests.forEach(r => {
            response += `• ${r.id}: ${r.appliance} - ${r.problem} (${r.status})<br>`;
          });
          botResponse = response;
        } else {
          botResponse = "You don't have any active repair requests at the moment.";
        }
      } else if (text.includes("thank") || text.includes("thanks")) {
        botResponse = "You're welcome! Is there anything else I can help you with?";
      } else if (text.includes("bye") || text.includes("goodbye")) {
        botResponse = "Goodbye! Feel free to reach out anytime you need assistance with your appliances.";
      } else {
        const lang = getLang(text);
        const issue = detectIssue(text);
        if (issue && kb[issue]) {
          const data = kb[issue];
          const langFinal = (lang === "bis") ? "bis" : "en";
          const stepLang = (lang === "bis") ? "bis_steps" : "steps";
          const steps = data[stepLang] || data.steps;
          botResponse = `<b>${data[langFinal]}</b><br><br><b>Steps:</b><br>${steps.map(s => "• " + s).join("<br>")}`;
        } else {
          const techList = technicians.filter(t => t.available).map(t => 
            `• <span class="tech" data-name="${t.name}">${t.name}</span> - ${t.expertise.join(', ')}`
          ).join('<br>');
          botResponse = `It seems your appliance issue may require professional inspection.<br><br>Here are our available technicians:<br><br>${techList}`;
        }
      }

      setMessages(prev => [...prev, { id: prev.length + 1, role: 'bot', text: botResponse }]);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleMessageClick = (e) => {
    const techName = e.target.getAttribute('data-name');
    if (techName) {
      const tech = technicians.find(t => t.name === techName);
      if (tech) {
        setSelectedTech(tech);
        setModalOpen(true);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Service Inquiry Chatbot</h1>
          <p className="text-slate-500 mt-2">Ask about our services, appliances, pricing, and more</p>
        </div>
        <button
          onClick={() => navigate('/request')}
          className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all"
        >
          <PlusCircle className="h-5 w-5" />
          Request Repair
        </button>
      </div>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-4"
          onClick={handleMessageClick}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}
                dangerouslySetInnerHTML={{ __html: message.text.replace(/<span class="tech"([^>]+)>([^<]+)<\/span>/g, `<span class="text-primary-600 font-bold underline cursor-pointer"$1>$2</span>`) }}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-slate-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your issue..."
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary-500"
            />
            <button
              onClick={handleSend}
              className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-all"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL FOR TECH PROFILE */}
      {modalOpen && selectedTech && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedTech.name}</h2>
                <p className="text-yellow-600 font-bold mb-4">Excellent {selectedTech.rating} ({selectedTech.completedJobs} reviews) | Top Pro</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">About</h3>
                <p className="text-slate-600 mb-4">Local appliance repair technician based in Cagayan de Oro, Philippines, specializing in {selectedTech.expertise.join(', ')}.</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Overview</h3>
                <p className="text-slate-600 mb-6">
                  Hired {selectedTech.completedJobs} times<br />
                  Background checked<br />
                  Available: {selectedTech.available ? 'Yes' : 'No'}<br />
                  Serving CDO and nearby areas
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-all">Message</button>
                  <button className="flex-1 py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-all">Request a call</button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Business hours</h3>
                <p className="text-slate-600 mb-4">Sun: Closed<br />Mon-Sat: 8:00 am - 6:00 pm</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Payment methods</h3>
                <p className="text-slate-600 mb-6">Cash on Hand and GCash only.</p>

                {/* Check if there's an estimate for this tech */}
                {(() => {
                  const existingEstimate = estimates.find(e => 
                    e.technician === selectedTech.name && 
                    e.customer === user?.name && 
                    (e.status === 'sent' || e.status === 'accepted' || e.status === 'declined')
                  );

                  if (existingEstimate) {
                    return (
                      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-slate-900 mb-2">Estimate Received:</h4>
                        <p className="text-2xl font-bold text-primary-600 mb-2">{existingEstimate.amount}</p>
                        <p className="text-slate-600 mb-4">{existingEstimate.description}</p>
                        {existingEstimate.status === 'sent' ? (
                          <div className="flex gap-3">
                            <button 
                              onClick={() => { 
                                acceptEstimate(existingEstimate.id);
                                setModalOpen(false);
                                navigate('/customer-estimates');
                              }} 
                              className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all"
                            >
                              Book Now (Accept Estimate)
                            </button>
                            <button 
                              onClick={() => { 
                                declineEstimate(existingEstimate.id);
                              }} 
                              className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
                            >
                              Decline
                            </button>
                          </div>
                        ) : existingEstimate.status === 'accepted' ? (
                          <div className="text-center py-3 bg-green-100 text-green-800 rounded-xl font-bold">
                            Estimate Accepted!
                          </div>
                        ) : (
                          <div className="text-center py-3 bg-red-100 text-red-800 rounded-xl font-bold">
                            Estimate Declined
                          </div>
                        )}
                      </div>
                    );
                  }

                  return null;
                })()}

                <button 
                  onClick={() => {
                    navigate(`/request-estimate/${selectedTech.id}`);
                    setModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all"
                >
                  Request Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TroubleshootingGuide;
