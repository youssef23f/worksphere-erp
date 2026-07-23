import { Inbox } from 'lucide-react';

export default function EmptyState({ title, description, actionLabel, onAction, icon: Icon = Inbox }) {
  return (
    <div className="enterprise-card p-12 text-center flex flex-col items-center justify-center space-y-4 border-dashed border-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
        <Icon className="w-8 h-8" />
      </div>
      <div className="max-w-xs space-y-1">
        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      {actionLabel && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}