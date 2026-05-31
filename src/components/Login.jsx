import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple role-based login simulation for demo
    let role = 'customer';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('tech')) role = 'technician';
    
    login(role);
    navigate('/dashboard');
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
            <span className="text-3xl font-black tracking-tighter italic">SPARKSERV</span>
          </div>

          <div className="relative z-10 mt-auto">
              <h1 
                className="text-4xl font-extrabold leading-tight"
              >
                Smart Management for <br />
                <span className="text-accent-400">Appliance Repair</span>
              </h1>
              <p 
                className="mt-6 text-lg text-primary-100/80"
              >
                Streamline your repair inquiry and technician matching process with our intelligent management system.
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-200">
              <Wrench className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic text-primary-900">SPARKSERV</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-2 text-slate-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 outline-none ring-primary-500/20 transition-all focus:border-primary-500 focus:bg-white focus:ring-4"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-slate-900 outline-none ring-primary-500/20 transition-all focus:border-primary-500 focus:bg-white focus:ring-4"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Remember for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 py-4 text-white font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all active:shadow-none"
            >
              Sign In
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500">
              Don't have an account?{' '}
              <a href="#" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                Sign up for free
              </a>
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100"></div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Trusted by Teams</span>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
