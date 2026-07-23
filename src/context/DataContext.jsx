import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  // جلب البيانات من LocalStorage أو البدء بمصفوفات فارغة
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('ws_employees');
    return saved ? JSON.parse(saved) : [];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('ws_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('ws_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('ws_leaves');
    return saved ? JSON.parse(saved) : [];
  });

  // حفظ التغييرات تلقائياً
  useEffect(() => {
    localStorage.setItem('ws_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('ws_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ws_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ws_leaves', JSON.stringify(leaves));
  }, [leaves]);

  // دوال الإضافة والتحكم
  const addEmployee = (employee) => {
    const newEmp = { ...employee, id: Date.now() };
    setEmployees(prev => [...prev, newEmp]);
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  const addProject = (project) => {
    const newProj = { ...project, id: `PRJ-${projects.length + 1}` };
    setProjects(prev => [...prev, newProj]);
  };

  const addTask = (task) => {
    const newTask = { ...task, id: `TSK-${tasks.length + 1}` };
    setTasks(prev => [...prev, newTask]);
  };

  const resetAllData = () => {
    setEmployees([]);
    setProjects([]);
    setTasks([]);
    setLeaves([]);
    localStorage.clear();
  };

  return (
    <DataContext.Provider value={{
      employees,
      projects,
      tasks,
      leaves,
      addEmployee,
      deleteEmployee,
      addProject,
      addTask,
      setEmployees,
      setProjects,
      setTasks,
      setLeaves,
      resetAllData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);