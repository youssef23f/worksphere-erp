import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Search, Bell, Sun, Moon, ShieldCheck, Command } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, onOpenSearch }) {
  const { currentUser, switchRole } = useAuth();
  const { notifications } = useData();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between transition-colors">
      
      {/* Global Search Bar Button (Ctrl + K) */}
      <button 
        onClick={onOpenSearch}
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-400 text-xs hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-all cursor-pointer w-64 border border-slate-200/50 dark:border-slate-700/50"
      >
        <Search className="w-4 h-4 text-slate-400" />
        <span className="flex-1 text-right">بحث شامل بالمنظام...</span>
        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded text-[10px] font-mono text-slate-500 dark:text-slate-300 shadow-xs">
          <Command className="w-2.5 h-2.5" /> K
        </span>
      </button>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Role Switcher (For Enterprise Testing) */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 mr-1" />
          {['admin', 'hr', 'manager', 'employee'].map((role) => (
            <button
              key={role}
              onClick={() => switchRole(role)}
              className={`px-2.5 py-1 rounded-lg uppercase text-[10px] transition-all cursor-pointer ${
                currentUser.role === role 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'hover:text-indigo-400'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
            <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute left-0 mt-3 w-80 enterprise-card p-4 shadow-xl z-50 space-y-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 border-b pb-2 border-slate-100 dark:border-slate-800">
                التنبيهات والإشعارات
              </h4>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{n.text}</p>
                    <span className="text-[9px] text-indigo-500 font-semibold">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 border-r pr-4 border-slate-200 dark:border-slate-800">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30"
          />
          <div className="hidden lg:block text-right">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{currentUser.name}</h4>
            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">{currentUser.role}</p>
          </div>
        </div>

      </div>
    </header>
  );
}