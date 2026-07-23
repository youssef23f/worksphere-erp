import { useState } from 'react';
import { useData } from '../../context/DataContext';
import EmptyState from '../../components/EmptyState';
import { 
  Briefcase, 
  Calendar, 
  Users, 
  Plus, 
  X 
} from 'lucide-react';

export default function Projects() {
  const { projects, addProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    status: 'In Progress',
    progress: 10,
    deadline: '',
    team: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.client) return;

    const teamArray = formData.team ? formData.team.split(',').map(s => s.trim()) : ['فريق التطوير'];

    addProject({
      ...formData,
      team: teamArray,
      progress: Number(formData.progress) || 0
    });

    setIsModalOpen(false);
    setFormData({ name: '', client: '', status: 'In Progress', progress: 10, deadline: '', team: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">المشاريع النشطة (Projects Overview)</h2>
          <p className="text-xs text-slate-400 mt-1">متابعة تقدم تنفيذ المشاريع والفرق الموكلة بالمهام</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> مشروع جديد
        </button>
      </div>

      {/* Projects Grid / Empty State */}
      {projects.length === 0 ? (
        <EmptyState
          title="لا توجد مشاريع حالية"
          description="لم يتم إضافة أي مشروع حتى الآن. قم بإضافة مشروعك الأول لبدء المتابعة."
          actionLabel="إضافة مشروع جديد"
          icon={Briefcase}
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div key={project.id} className="enterprise-card p-5 space-y-4">
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                    {project.id}
                  </span>
                  <h3 className="font-black text-base text-slate-800 dark:text-slate-100 mt-1">{project.name}</h3>
                  <p className="text-xs text-slate-400">العميل: <strong className="text-slate-600 dark:text-slate-300">{project.client}</strong></p>
                </div>

                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 text-[10px] font-bold">
                  {project.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">نسبة الإنجاز</span>
                  <span className="text-indigo-500 font-mono">{project.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {Array.isArray(project.team) ? project.team.join('، ') : project.team}
                  </span>
                </div>

                <div className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{project.deadline || 'غير محدد'}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md enterprise-card p-6 bg-white dark:bg-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">إضافة مشروع جديد</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">اسم المشروع</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تطوير تطبيق الجوال v2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">اسم العميل / الجهة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شركة Stripe Global"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">نسبة الإنجاز (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">الموعد النهائي</label>
                  <input
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">أعضاء الفريق (مفصولين بفاصلة)</label>
                <input
                  type="text"
                  placeholder="أحمد محمود، سارة خالد"
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
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
                  حفظ المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}