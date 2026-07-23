import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  CircleDollarSign, 
  Download, 
  FileText, 
  TrendingUp, 
  Search, 
  CheckCircle, 
  Printer, 
  X 
} from 'lucide-react';

export default function Payroll() {
  const { employees } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const totalPayroll = employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
  const avgSalary = employees.length > 0 ? Math.round(totalPayroll / employees.length) : 0;

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">مسير الرواتب والبدلات (Payroll Management)</h2>
          <p className="text-xs text-slate-400 mt-1">احتساب المستحقات المالية، الضرائب، وتوليد قسيمة الراتب (Payslip)</p>
        </div>

        <button 
          onClick={() => alert('تم تصدير تقرير مسير الرواتب بنجاح (PDF)')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
        >
          <Download className="w-4 h-4 text-emerald-400" /> تصدير الكشف الإجمالي PDF
        </button>
      </div>

      {/* Payroll Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="enterprise-card p-4 space-y-1">
          <p className="text-xs font-semibold text-slate-400">إجمالي الرواتب المعتمدة</p>
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">${totalPayroll.toLocaleString()}</h3>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> شهر يوليو 2026
          </span>
        </div>

        <div className="enterprise-card p-4 space-y-1">
          <p className="text-xs font-semibold text-slate-400">متوسط راتب الموظف</p>
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">${avgSalary.toLocaleString()}</h3>
          <span className="text-[10px] text-slate-400 font-medium">بناءً على {employees.length} موظف</span>
        </div>

        <div className="enterprise-card p-4 space-y-1">
          <p className="text-xs font-semibold text-slate-400">حالة الاعتماد الصرف</p>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> معتمد وجاهز للحوالات
            </span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="enterprise-card p-5 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              placeholder="البحث باسم الموظف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-100 focus:outline-none border border-slate-200/50 dark:border-slate-700/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 px-3">الموظف</th>
                <th className="pb-3 px-3">الراتب الأساسي</th>
                <th className="pb-3 px-3">البدلات (+10%)</th>
                <th className="pb-3 px-3">الاستقطاعات (-5%)</th>
                <th className="pb-3 px-3">صافي الراتب (Net)</th>
                <th className="pb-3 px-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((emp) => {
                const baseSalary = Number(emp.salary) || 3000;
                const bonus = Math.round(baseSalary * 0.10);
                const deduction = Math.round(baseSalary * 0.05);
                const netSalary = baseSalary + bonus - deduction;

                return (
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
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700 dark:text-slate-300">${baseSalary.toLocaleString()}</td>
                    <td className="py-3 px-3 font-mono text-emerald-500 font-semibold">+${bonus.toLocaleString()}</td>
                    <td className="py-3 px-3 font-mono text-rose-500 font-semibold">-${deduction.toLocaleString()}</td>
                    <td className="py-3 px-3 font-mono font-black text-indigo-500 text-sm">${netSalary.toLocaleString()}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setSelectedPayslip({ ...emp, baseSalary, bonus, deduction, netSalary })}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" /> القسيمة (Payslip)
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Payslip Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md enterprise-card p-6 bg-white dark:bg-slate-900 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">قسيمة الراتب التفصيلية</h3>
              </div>
              <button onClick={() => setSelectedPayslip(null)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-3 text-xs">
              <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">اسم الموظف:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{selectedPayslip.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                <span className="text-slate-400">القسم:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{selectedPayslip.department}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>الراتب الأساسي:</span>
                <span className="font-mono font-semibold">${selectedPayslip.baseSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-500">
                <span>بدلات وعلاوات (+10%):</span>
                <span className="font-mono font-semibold">+${selectedPayslip.bonus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-500">
                <span>خصومات وتأمين (-5%):</span>
                <span className="font-mono font-semibold">-${selectedPayslip.deduction.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white">
                <span>الصافي المستحق:</span>
                <span className="font-mono text-indigo-500">${selectedPayslip.netSalary.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => { alert('جاري الطباعة...'); setSelectedPayslip(null); }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> طباعة
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}