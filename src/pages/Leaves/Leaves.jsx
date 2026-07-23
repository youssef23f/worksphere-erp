import { useState } from 'react';
import { useData } from '../../context/DataContext';
import EmptyState from '../../components/EmptyState';
import { 
  CalendarOff, 
  Check, 
  X, 
  Plus, 
  Calendar 
} from 'lucide-react';

export default function Leaves() {
  const { leaves, setLeaves, employees } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: employees[0]?.name || '',
    type: 'إجازة سنوية',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleAction = (id, newStatus) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.startDate || !formData.endDate) return;

    // حساب عدد الأيام
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const emp = employees.find(e => e.name === formData.name);

    const newLeave = {
      id: Date.now(),
      name: formData.name,
      role: emp?.role || 'موظف',
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: diffDays || 1,
      status: 'Pending',
      reason: formData.reason || 'بدون سبب مذكور'
    };

    setLeaves(prev => [newLeave, ...prev]);
    setIsModalOpen(false);
    setFormData({ name: employees[0]?.name || '', type: 'إجازة سنوية', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">إدارة الإجازات (Leave Requests)</h2>
          <p className="text-xs text-slate-400 mt-1">متابعة وطلب الإجازات السنوية، المرضية، والتعويضية للموظفين</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> طلب إجازة جديدة
        </button>
      </div>

      {/* Main List / Empty State */}
      {leaves.length === 0 ? (
        <EmptyState
          title="لا توجد طلبات إجازة"
          description="لم يتم تقديم أي طلب إجازة بعد. اضغط على الزر لتقديم طلب إجازة جديد."
          actionLabel="طلب إجازة جديدة"
          icon={CalendarOff}
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {leaves.map((leave) => (
            <div key={leave.id} className="enterprise-card p-5 space-y-4 relative">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-sm text-slate-800 dark:text-slate-100">{leave.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400">{leave.role}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                  leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' :
                  leave.status === 'Pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' :
                  'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                }`}>
                  {leave.status === 'Approved' ? 'مقبول' : leave.status === 'Pending' ? 'قيد النظر' : 'مرفوض'}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>نوع الإجازة:</span>
                  <strong className="text-slate-700 dark:text-slate-200">{leave.type}</strong>
                </div>
                <div className="flex justify-between">
                  <span>المدة:</span>
                  <strong className="font-mono text-indigo-500">{leave.days} أيام</strong>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>الفترة:</span>
                  <span className="font-mono text-slate-400">{leave.startDate} ➔ {leave.endDate}</span>
                </div>
                <p className="text-[11px] bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg italic text-slate-500">
                  "{leave.reason}"
                </p>
              </div>

              {leave.status === 'Pending' && (
                <div className="pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleAction(leave.id, 'Approved')}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" /> قبول
                  </button>
                  <button
                    onClick={() => handleAction(leave.id, 'Rejected')}
                    className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <X className="w-3.5 h-3.5" /> رفض
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

      {/* Leave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md enterprise-card p-6 bg-white dark:bg-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">تقديم طلب إجازة جديد</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">الموظف</label>
                {employees.length > 0 ? (
                  <select
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  >
                    {employees.map(e => <option key={e.id} value={e.name}>{e.name} ({e.role})</option>)}
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    placeholder="اسم الموظف"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">نوع الإجازة</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                >
                  <option value="إجازة سنوية">إجازة سنوية</option>
                  <option value="إجازة مرضية">إجازة مرضية</option>
                  <option value="إجازة بدون راتب">إجازة بدون راتب</option>
                  <option value="إجازة طارئة">إجازة طارئة</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">تاريخ البدء</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">تاريخ الانتهاء</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">السبب / الملاحظات</label>
                <textarea
                  rows="2"
                  placeholder="سبب طلب الإجازة..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  إرسال الطلب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}