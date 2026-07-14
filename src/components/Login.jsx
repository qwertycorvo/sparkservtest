import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Cpu, User, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roleOptions = [
    { id: 'customer', name: 'Customer', icon: User, color: 'bg-blue-100 text-blue-600' },
    { id: 'technician', name: 'Technician', icon: Wrench, color: 'bg-orange-100 text-orange-600' },
    { id: 'admin', name: 'Admin', icon: UserCheck, color: 'bg-green-100 text-green-600' },
    { id: 'superadmin', name: 'Superadmin', icon: Shield, color: 'bg-purple-100 text-purple-600' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      login(selectedRole);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-4 font-sans text-slate-900">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-100/50 lg:flex-row">
        
        {/* Left Side: Branding & Illustration */}
        <div className="relative hidden w-1/2 flex-col bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-white lg:flex">
          <div className="absolute top-0 left-0 h-full w-full opacity-10 overflow-hidden">
             <Cpu className="absolute -top-10 -left-10 h-64 w-64 rotate-12" />
             <Wrench className="absolute -bottom-20 -right-10 h-80 w-80 -rotate-12" />
          </div>

          <div className="relative z-10 flex items-center gap-2 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-xl shadow-primary-900/20">
              <Wrench className="h-7 w-7" />
            </div>
            <div>
              <span className="text-3xl font-black tracking-tighter italic block leading-none">SPARKSERV</span>
              <span className="text-lg font-bold tracking-[0.2em] text-accent-400 uppercase">Hanap Usap Fix</span>
            </div>
          </div>

          <div className="relative z-10 mt-auto">
              <h1 
                className="text-4xl font-extrabold leading-tight"
              >
                Smart Management for <br />
                <span className="text-accent-400">Appliance Repair</span>
              </h1>
              <p 
                className="mt-6 text-lg text-primary-100/90"
              >
                Streamline your repair inquiry and technician matching process with our rule-based matching system.
              </p>
            
            <div className="mt-12 flex gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold">20</span>
                <span className="text-sm text-primary-200/60 uppercase tracking-wider">Technicians</span>
              </div>
              <div className="h-12 w-px bg-white/10"></div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold">196</span>
                <span className="text-sm text-primary-200/60 uppercase tracking-wider">Repairs Done</span>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-12 right-12 z-10">
            <ShieldCheck className="h-16 w-16 text-accent-500 opacity-50" />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full p-8 sm:p-12 lg:w-1/2">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white shadow-lg shadow-primary-200">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter italic text-primary-900 block leading-none">SPARKSERV</span>
              <span className="text-sm font-bold tracking-[0.2em] text-accent-600 uppercase">Hanap Usap Fix</span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Select Your Role</h2>
            <p className="mt-2 text-slate-500">Choose how you want to access SPARKSERV for demonstration.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              {roleOptions.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                    selectedRole === role.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${role.color}`}>
                    <role.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{role.name}</p>
                    <p className="text-xs text-slate-500">
                      {role.id === 'customer' && 'Request repairs and track progress'}
                      {role.id === 'technician' && 'Manage assigned jobs'}
                      {role.id === 'admin' && 'Review bookings and confirm payments'}
                      {role.id === 'superadmin' && 'Full system control'}
                    </p>
                  </div>
                  {selectedRole === role.id && (
                    <div className="ml-auto">
                      <div className="h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!selectedRole}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 py-4 text-white font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue as {roleOptions.find(r => r.id === selectedRole)?.name || 'Guest'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;