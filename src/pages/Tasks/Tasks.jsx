import { useState } from 'react';
import { useData } from '../../context/DataContext';
import EmptyState from '../../components/EmptyState';
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  X, 
  MoveRight, 
  MoveLeft,
  CheckSquare
} from 'lucide-react';

export default function Tasks() {
  const { tasks, setTasks, addTask, employees } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    priority: 'Medium', 
    assignee: employees[0]?.name || '', 
    status: 'todo',
    dueDate: new Date().toISOString().split('T')[0]
  });

  // تحريك المهمة بين الأعمدة
  const moveTask = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;

    addTask({
      ...newTask,
      assignee: newTask.assignee || 'غير محدد'
    });

    setIsModalOpen(false);
    setNewTask({ 
      title: '', 
      priority: 'Medium', 
      assignee: employees[0]?.name || '', 
      status: 'todo',
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  const columns = [
    { id: 'todo', name: 'قيد الانتظار (To Do)', icon: Clock, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { id: 'in_progress', name: 'جاري العمل (In Progress)', icon: AlertCircle, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    { id: 'done', name: 'مكتملة (Done)', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">لوحة إدارة المهام (Kanban Tasks)</h2>
          <p className="text-xs text-slate-400 mt-1">تتبع المهام ومراحل التنفيذ للموظفين بأسلوب Agile</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> إضافة مهمة جديدة
        </button>
      </div>

      {/* Kanban Columns or Empty State */}
      {tasks.length === 0 ? (
        <EmptyState
          title="لا توجد مهام حالياً"
          description="لوحة المهام فارغة تماماً. يمكنك إضافة أوّل مهمة وتوزيعها على فريق العمل."
          actionLabel="إضافة مهمة جديدة"
          icon={CheckSquare}
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map(col => {
            const colTasks = tasks.filter(t => t.status === col.id);
            const ColIcon = col.icon;

            return (
              <div key={col.id} className="enterprise-card p-4 space-y-4 bg-slate-100/50 dark:bg-slate-900/50">
                
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg ${col.color}`}>
                      <ColIcon className="w-4 h-4" />
                    </span>
                    <h3 className="font-bold text-xs text-slate-800 dark:text-slate-100">{col.name}</h3>
                  </div>
                  <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {colTasks.length}
                  </span>
                </div>

                {/* Task Cards List */}
                <div className="space-y-3 min-h-[300px]">
                  {colTasks.map(task => (
                    <div key={task.id} className="enterprise-card p-4 space-y-3 bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 transition-all">
                      
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 leading-snug">{task.title}</h4>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${
                          task.priority === 'High' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400' :
                          task.priority === 'Medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-indigo-500" />
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{task.assignee}</span>
                        </div>
                        <span className="font-mono">{task.dueDate}</span>
                      </div>

                      {/* Move Controls */}
                      <div className="flex items-center justify-between pt-1">
                        {col.id !== 'todo' && (
                          <button 
                            onClick={() => moveTask(task.id, col.id === 'done' ? 'in_progress' : 'todo')}
                            className="text-[10px] font-bold text-slate-400 hover:text-indigo-500 flex items-center gap-0.5 cursor-pointer"
                          >
                            <MoveRight className="w-3 h-3" /> للخلف
                          </button>
                        )}
                        
                        {col.id !== 'done' && (
                          <button 
                            onClick={() => moveTask(task.id, col.id === 'todo' ? 'in_progress' : 'done')}
                            className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 mr-auto flex items-center gap-0.5 cursor-pointer"
                          >
                            للعامود التالي <MoveLeft className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Modal Add Task */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md enterprise-card p-6 bg-white dark:bg-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">إضافة مهمة جديدة</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">عنوان المهمة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مراجعة كود التوثيق"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">الأولوية</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">المسؤول</label>
                  {employees.length > 0 ? (
                    <select
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                    >
                      {employees.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder="اسم الموظف"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">الموعد النهائي (Due Date)</label>
                <input
                  type="date"
                  required
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
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
                  إنشاء المهمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}