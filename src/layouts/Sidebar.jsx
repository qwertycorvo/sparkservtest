import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  ClipboardList, 
  MessageSquare, 
  Settings, 
  LogOut, 
  PlusCircle, 
  History,
  MapPin,
  CreditCard,
  Eye,
  Ticket,
  HelpCircle,
  TrendingUp,
  Activity,
  UserCog,
  Cog,
  BarChart3,
  FileText,
  ShieldCheck,
  Coins
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = {
    admin: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Activity, label: 'Progress Management', path: '/admin-progress' },
      { icon: Eye, label: 'Job Monitoring', path: '/job-monitoring' },
      { icon: Users, label: 'User Management', path: '/users' },
      { icon: ClipboardList, label: 'Booking Review', path: '/bookings' },
      { icon: Ticket, label: 'Support Tickets', path: '/tickets' },
      { icon: CreditCard, label: 'Transactions', path: '/payments' },
    ],
    customer: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: HelpCircle, label: 'Service Inquiry', path: '/inquiry' },
      { icon: PlusCircle, label: 'Request Repair', path: '/request' },
      { icon: Coins, label: 'My Estimates', path: '/customer-estimates' },
      { icon: TrendingUp, label: 'Progress Tracking', path: '/progress' },
      { icon: Wrench, label: 'My Appliances', path: '/appliances' },
      { icon: Ticket, label: 'Support Tickets', path: '/tickets' },
      { icon: History, label: 'Repair History', path: '/history' },
    ],
    technician: [
      { icon: LayoutDashboard, label: 'Job Dashboard', path: '/dashboard' },
      { icon: Coins, label: 'Estimate Requests', path: '/tech-estimates' },
      { icon: Activity, label: 'My Jobs', path: '/tech-progress' },
      { icon: ClipboardList, label: 'Booking Review', path: '/jobs' },
      { icon: MessageSquare, label: 'Messages', path: '/messages' },
      { icon: MapPin, label: 'Navigation', path: '/navigation' },
    ],
    superadmin: [
      { icon: LayoutDashboard, label: 'System Dashboard', path: '/dashboard' },
      { icon: Users, label: 'User Management', path: '/users' },
      { icon: ShieldCheck, label: 'Role Management', path: '/role-management' },
      { icon: Activity, label: 'Progress Management', path: '/admin-progress' },
      { icon: Eye, label: 'Job Monitoring', path: '/job-monitoring' },
      { icon: ClipboardList, label: 'Booking Review', path: '/bookings' },
      { icon: Ticket, label: 'Support Tickets', path: '/tickets' },
      { icon: CreditCard, label: 'Transactions', path: '/payments' },
      { icon: Settings, label: 'System Config', path: '/system-config' },
      { icon: FileText, label: 'System Logs', path: '/system-logs' },
    ]
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const currentMenu = menuItems[user?.role] || [];

  if (!user) return null;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-50">
      <div className="p-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
          <Wrench className="h-5 w-5" />
        </div>
        <span className="text-xl font-black tracking-tighter italic text-primary-900">SPARKSERV</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {currentMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary-50 text-primary-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {item.icon && <item.icon className="h-5 w-5" />}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
