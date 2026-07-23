import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import GlobalSearch from './components/common/GlobalSearch';

import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Attendance from './pages/Attendance/Attendance';
import Payroll from './pages/Payroll/Payroll';
import Leaves from './pages/Leaves/Leaves';
import Projects from './pages/Projects/Projects';
import Tasks from './pages/Tasks/Tasks';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // التحكم في Dark Mode Class على الـ HTML Body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
          
          {/* Collapsible Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Layout Area */}
          <div className="flex-1 mr-20 md:mr-64 transition-all duration-300 min-w-0">
            
            {/* Top Navbar */}
            <Navbar 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
              onOpenSearch={() => setIsSearchOpen(true)} 
            />

            {/* Page Content View */}
            <main className="p-6 max-w-7xl mx-auto">
              {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
              {activeTab === 'employees' && <Employees />}
              {activeTab === 'attendance' && <Attendance />}
              {activeTab === 'payroll' && <Payroll />}
              {activeTab === 'leaves' && <Leaves />}
              {activeTab === 'projects' && <Projects />}
              {activeTab === 'tasks' && <Tasks />}
            </main>

          </div>

          {/* Global Search Modal */}
          <GlobalSearch 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
            setActiveTab={setActiveTab} 
          />

        </div>
      </DataProvider>
    </AuthProvider>
  );
}