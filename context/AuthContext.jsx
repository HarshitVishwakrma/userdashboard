// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  // Login function to save user data in state and localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', userData.token);
  };

  // Fetch the latest user data (for points refresh)
  const refreshUserData = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/user/v1/get-users-info-id', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      setUser(data); // Update state with fresh user data
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
