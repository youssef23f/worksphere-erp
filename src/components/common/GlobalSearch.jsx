import { useEffect, useState } from 'react';
import { Search, Users, Briefcase, CalendarCheck, X, ArrowLeft } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function GlobalSearch({ isOpen, onClose, setActiveTab }) {
  const { employees, projects } = useData();
  const [query, setQuery] = useState('');

  // استماع لاختصار لوحة المفاتيح Ctrl + K أو Cmd + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // يمكن فتح Search عن طريق الأب
        }
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredEmployees = query.trim()
    ? employees.filter(e => e.name.toLowerCase().includes(query.toLowerCase()) || e.role.toLowerCase().includes(query.toLowerCase()))
    : employees.slice(0, 3);

  const filteredProjects = query.trim()
    ? projects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.client.toLowerCase().includes(query.toLowerCase()))
    : projects.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl enterprise-card bg-white dark:bg-slate-900 overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن موظف، مشروع، قسم..."
            autoFocus
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none font-medium"
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Muted Section Title */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" /> الموظفين
            </div>
            <div className="space-y-1">
              {filteredEmployees.map((emp) => (
                <button
                  key={emp.id}
                  onClick={() => { setActiveTab('employees'); onClose(); }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all text-right cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.name} className="w-7 h-7 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">{emp.name}</p>
                      <p className="text-[10px] text-slate-400">{emp.role} • {emp.department}</p>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> المشاريع
            </div>
            <div className="space-y-1">
              {filteredProjects.map((prj) => (
                <button
                  key={prj.id}
                  onClick={() => { setActiveTab('projects'); onClose(); }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all text-right cursor-pointer group"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">{prj.name}</p>
                    <p className="text-[10px] text-slate-400">العميل: {prj.client}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500">
                    {prj.progress}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
          <span>للتنقل استخدم الأسهم و Enter</span>
          <span>اضغط ESC للإغلاق</span>
        </div>

      </div>
    </div>
  );
}