import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Users, 
  UserCheck, 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  Plus, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export default function Dashboard({ setActiveTab }) {
  const { currentUser } = useAuth();
  const { employees, projects } = useData();

  // حساب الأرقام والإحصائيات
  const totalEmployees = employees.length;
  const presentCount = employees.filter(e => e.status === 'Present').length;
  const attendanceRate = totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 0;
  const totalPayroll = employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
  const activeProjects = projects.length;

  // بيانات الرسوم البيانية التوضيحية (Analytics Mock Data)
  const attendanceTrend = [
    { day: 'الأحد', حضر: 92, غائب: 8 },
    { day: 'الإثنين', حضر: 95, غائب: 5 },
    { day: 'الثلاثاء', حضر: 88, غائب: 12 },
    { day: 'الأربعاء', حضر: 96, غائب: 4 },
    { day: 'الخميس', حضر: 90, غائب: 10 },
  ];

  const departmentData = [
    { dept: 'التطوير', count: 12 },
    { dept: 'التصميم', count: 6 },
    { dept: 'المنتجات', count: 4 },
    { dept: 'الموارد البشرية', count: 5 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 🌟 Welcome Banner */}
      <div className="relative overflow-hidden enterprise-panel p-6 bg-gradient-to-r from-indigo-900/90 via-slate-900 to-indigo-950 text-white border-none shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              نظام إدارة العمليات الحية v2.4
            </div>
            <h2 className="text-2xl font-black tracking-tight">مرحباً بك مجدداً، {currentUser.name} 👋</h2>
            <p className="text-slate-300 text-xs mt-1 font-medium">
              إليك نظرة عامة على مؤشرات أداء الشركة، الموظفين، والمشاريع اليوم.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('employees')} 
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> إضافة موظف جديد
            </button>
          </div>
        </div>
      </div>

      {/* 📊 Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="enterprise-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Users className="w-5 h-5" />
            </span>
            <span className="flex items-center text-[11px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3 ml-0.5" /> +12%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">إجمالي الموظفين</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{totalEmployees}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="enterprise-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold text-slate-400">اليوم</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">نسبة الحضور</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{attendanceRate}%</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="enterprise-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <DollarSign className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold text-indigo-500">شهرياً</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">مسير الرواتب</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">${totalPayroll.toLocaleString()}</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="enterprise-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold text-blue-500">نشط الآن</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">المشاريع الحالية</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{activeProjects}</h3>
          </div>
        </div>

      </div>

      {/* 📈 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 enterprise-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">مؤشر الحضور الأسبوعي (%)</h3>
              <p className="text-[11px] text-slate-400">نسبة حضور وغياب الموظفين خلال الأسبوع</p>
            </div>
            <button onClick={() => setActiveTab('attendance')} className="text-indigo-500 hover:text-indigo-600 text-xs font-bold flex items-center gap-1 cursor-pointer">
              تفاصيل <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <defs>
                  <linearGradient id="colorPresence" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="حضر" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPresence)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Breakdown Bar Chart */}
        <div className="enterprise-card p-5 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">توزيع الموظفين حسب القسم</h3>
            <p className="text-[11px] text-slate-400">توزيع القوى العاملة الحالية</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <XAxis dataKey="dept" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ⏱️ Attendance Timeline & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Timeline */}
        <div className="lg:col-span-2 enterprise-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" /> سجل الحضور المباشر اليوم
            </h3>
            <span className="text-[11px] text-slate-400">تحديث تلقائي</span>
          </div>

          <div className="space-y-3">
            {employees.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                  <img src={emp.avatar} alt={emp.name} className="w-9 h-9 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{emp.name}</h4>
                    <p className="text-[10px] text-slate-400">{emp.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                    emp.status === 'Present' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' :
                    emp.status === 'Remote' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' :
                    'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                  }`}>
                    {emp.status === 'Present' && <CheckCircle2 className="w-3 h-3" />}
                    {emp.status === 'Remote' && <Clock className="w-3 h-3" />}
                    {emp.status === 'Absent' && <XCircle className="w-3 h-3" />}
                    {emp.status === 'Present' ? 'حاضر في المكتب' : emp.status === 'Remote' ? 'عمل عن بعد' : 'غائب'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">09:00 AM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="enterprise-card p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">إجراءات سريعة</h3>
          
          <div className="space-y-2">
            <button onClick={() => setActiveTab('leaves')} className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 border border-slate-200/60 dark:border-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>تقديم طلب إجازة</span>
              <Calendar className="w-4 h-4 text-indigo-500" />
            </button>

            <button onClick={() => setActiveTab('payroll')} className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 border border-slate-200/60 dark:border-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>تصدير تقرير الرواتب PDF</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </button>

            <button onClick={() => setActiveTab('tasks')} className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 border border-slate-200/60 dark:border-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>متابعة لوحة Kanban</span>
              <Briefcase className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}