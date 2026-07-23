import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // الأدوار المتاحة: 'admin' | 'hr' | 'manager' | 'employee'
  const [currentUser, setCurrentUser] = useState({
    name: 'يوسف أحمد',
    email: 'youssef@worksphere.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Senior HR Operations Director'
  });

  const switchRole = (newRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role: newRole,
      title: newRole === 'admin' ? 'Chief Executive Officer' :
             newRole === 'hr' ? 'HR Director' :
             newRole === 'manager' ? 'Engineering Lead' : 'Senior Front-End Engineer'
    }));
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);