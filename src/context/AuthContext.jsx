import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Roles: 'admin', 'technician', 'customer'
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sparkserv_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });

  const login = (role) => {
    const newUser = {
      id: 1,
      name: role === 'admin' ? 'Admin User' : role === 'technician' ? 'John Technician' : 'Jane Customer',
      role: role,
      email: `${role}@sparkserv.com`
    };
    setUser(newUser);
    localStorage.setItem('sparkserv_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sparkserv_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
