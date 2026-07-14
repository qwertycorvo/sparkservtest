import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Roles: 'customer', 'technician', 'admin', 'superadmin'
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
    const userNames = {
      customer: 'Jane Customer',
      technician: 'John Technician',
      admin: 'Admin User',
      superadmin: 'Superadmin'
    };
    const newUser = {
      id: 1,
      name: userNames[role],
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
