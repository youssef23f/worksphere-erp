import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Globe, 
  UserCheck, 
  Search, 
  Check, 
  X 
} from 'lucide-react';

export default function Attendance() {
  const { employees } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceData, setAttendanceData] = useState(employees);

  // تحديث حالة الحضور للموظف
  const toggleStatus = (id, newStatus) => {
    setAttendanceData(prev => prev.map(emp => 
      emp.id === id ? { ...emp, status: newStatus } : emp
    ));
  };

  const filtered = attendanceData.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    present: attendanceData.filter(e => e.status === 'Present').length,
    remote: attendanceData.filter(e => e.status === 'Remote').length,
    absent: attendanceData.filter(e => e.status === 'Absent').length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">سجل الحضور والانصراف (Attendance Tracker)</h2>
          <p className="text-xs text-slate-400 mt-1">متابعة حضور الموظفين، العمل عن بعد، وتحديث الحالات لحظياً</p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-xs">
          <CalendarIcon className="w-4 h-4 text-indigo-500" />
          <span>تاريخ اليوم: {new Date().toISOString().split('T')[0]}</span>
        </div>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="enterprise-card p-4 flex items-center gap-3">
          <span className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500">
            <UserCheck className="w-5 h-5" />
          </span>
          <div>
            <p className="text-xs text-slate-400 font-semibold">حاضر في المكتب</p>
            <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{stats.present}</h4>
          </div>
        </div>

        <div className="enterprise-card p-4 flex items-center gap-3">
          <span className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-500">
            <Globe className="w-5 h-5" />
          </span>
          <div>
            <p className="text-xs text-slate-400 font-semibold">عمل عن بعد (Remote)</p>
            <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{stats.remote}</h4>
          </div>
        </div>

        <div className="enterprise-card p-4 flex items-center gap-3">
          <span className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500">
            <XCircle className="w-5 h-5" />
          </span>
          <div>
            <p className="text-xs text-slate-400 font-semibold">غائب اليوم</p>
            <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{stats.absent}</h4>
          </div>
        </div>
      </div>

      {/* Attendance Table Card */}
      <div className="enterprise-card p-5 space-y-4">
        
        {/* Search */}
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              placeholder="بحث في سجل الحضور..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-100 focus:outline-none border border-slate-200/50 dark:border-slate-700/50"
            />
          </div>
        </div>

        {/* Attendance List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 px-3">الموظف</th>
                <th className="pb-3 px-3">القسم</th>
                <th className="pb-3 px-3">وقت تسجيل الدخول</th>
                <th className="pb-3 px-3">الحالة الحالية</th>
                <th className="pb-3 px-3 text-center">تغيير الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{emp.name}</p>
                        <p className="text-[10px] text-slate-400">{emp.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-300">{emp.department}</td>
                  <td className="py-3 px-3 font-mono text-slate-500">09:00 AM</td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 ${
                      emp.status === 'Present' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' :
                      emp.status === 'Remote' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' :
                      'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                    }`}>
                      {emp.status === 'Present' && <CheckCircle2 className="w-3 h-3" />}
                      {emp.status === 'Remote' && <Globe className="w-3 h-3" />}
                      {emp.status === 'Absent' && <XCircle className="w-3 h-3" />}
                      {emp.status === 'Present' ? 'حاضر' : emp.status === 'Remote' ? 'عمل عن بعد' : 'غائب'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 gap-1">
                      <button
                        onClick={() => toggleStatus(emp.id, 'Present')}
                        className={`p-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          emp.status === 'Present' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="حاضر"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleStatus(emp.id, 'Remote')}
                        className={`p-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          emp.status === 'Remote' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="عمل عن بعد"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleStatus(emp.id, 'Absent')}
                        className={`p-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          emp.status === 'Absent' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                        }`}
                        title="غائب"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}