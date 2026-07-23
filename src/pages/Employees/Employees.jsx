import { useState } from 'react';
import { useData } from '../../context/DataContext';
import EmptyState from '../../components/EmptyState';
import { UserPlus, Users, Search, Trash2, X } from 'lucide-react';

export default function Employees() {
  const { employees, addEmployee, deleteEmployee } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'الهندسة والتطوير',
    salary: '',
    email: '',
    status: 'Present',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;
    addEmployee(formData);
    setIsModalOpen(false);
    setFormData({ name: '', role: '', department: 'الهندسة والتطوير', salary: '', email: '', status: 'Present', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' });
  };

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">سجل الموظفين (Employees Directory)</h2>
          <p className="text-xs text-slate-400 mt-1">إدارة بيانات وقائمة الموظفين في الشركة</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> إضافة موظف جديد
        </button>
      </div>

      {/* Main Content */}
      {employees.length === 0 ? (
        <EmptyState
          title="لا يوجد موظفون في النظام"
          description="لم يتم إضافة أي موظف حتى الآن. ابدأ بإضافة موظفك الأول لإدارة بياناته."
          actionLabel="إضافة أول موظف"
          icon={Users}
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="enterprise-card p-5 space-y-4">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              placeholder="بحث باسم الموظف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-100 focus:outline-none border border-slate-200/50 dark:border-slate-700/50"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="pb-3 px-3">الموظف</th>
                  <th className="pb-3 px-3">القسم</th>
                  <th className="pb-3 px-3">الراتب الأساسي</th>
                  <th className="pb-3 px-3 text-center">حذف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100">{emp.name}</p>
                          <p className="text-[10px] text-slate-400">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{emp.department}</td>
                    <td className="py-3 px-3 font-mono font-bold text-indigo-500">${Number(emp.salary || 0).toLocaleString()}</td>
                    <td className="py-3 px-3 text-center">
                      <button 
                        onClick={() => deleteEmployee(emp.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md enterprise-card p-6 bg-white dark:bg-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">إضافة موظف جديد</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: يوسف أحمد"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">المسمى الوظيفي</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: Senior Software Engineer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">القسم</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="الهندسة والتطوير">الهندسة والتطوير</option>
                    <option value="التصميم">التصميم</option>
                    <option value="الموارد البشرية">الموارد البشرية</option>
                    <option value="التسويق">التسويق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">الراتب الشهري ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="4000"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
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
                  حفظ الموظف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}