import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));

  useEffect(() => {
    if (!token) {
      delete axios.defaults.headers.common['Authorization'];
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('/api/auth/me')
      .then((res) => {
        if (res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setToken('');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    setLoading(false);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenValue);
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    setLoading(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
