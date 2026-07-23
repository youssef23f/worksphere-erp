import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  CircleDollarSign, 
  CalendarOff, 
  Briefcase, 
  CheckSquare, 
  ChevronRight, 
  ChevronLeft,
  Zap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [collapsed, setCollapsed] = useState(false);

  const navigation = [
    { name: 'لوحة التحكم', id: 'dashboard', icon: LayoutDashboard },
    { name: 'الموظفين', id: 'employees', icon: Users },
    { name: 'الحضور والغياب', id: 'attendance', icon: CalendarCheck },
    { name: 'مسير الرواتب', id: 'payroll', icon: CircleDollarSign },
    { name: 'الإجازات', id: 'leaves', icon: CalendarOff },
    { name: 'المشاريع', id: 'projects', icon: Briefcase },
    { name: 'المهام (Kanban)', id: 'tasks', icon: CheckSquare },
  ];

  return (
    <aside 
      className={`fixed top-0 right-0 h-screen bg-slate-900 border-l border-slate-800 text-slate-300 transition-all duration-300 z-40 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-white tracking-wide">WorkSphere</h1>
                <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">Enterprise ERP</span>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="mx-auto w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
          )}

          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer hidden md:block"
          >
            {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 mt-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                {!collapsed && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-800/80 m-3 rounded-2xl bg-slate-800/40 text-center">
          <p className="text-[11px] font-bold text-slate-300">WorkSphere v2.4</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Enterprise HR System</p>
        </div>
      )}
    </aside>
  );
}