import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configure API base URL for authentication
const AUTH_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if admin is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (token && adminData) {
      try {
        setAdmin(JSON.parse(adminData));
        setIsAdminAuthenticated(true);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
    setIsLoading(false);
  }, []);

  // Admin login function
  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post(
        `${AUTH_API_URL}/auth/admin/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        const { token, admin: adminData } = response.data;
        
        // Store token and admin data
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminData', JSON.stringify(adminData));
        
        // Update state
        setAdmin(adminData);
        setIsAdminAuthenticated(true);

        return { 
          success: true, 
          message: response.data.message 
        };
      } else {
        return { 
          success: false, 
          error: response.data.error || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Network error. Please try again.' 
      };
    }
  };

  // Admin logout function
  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminEmail'); // Remove old key if exists
    setAdmin(null);
    setIsAdminAuthenticated(false);
  };

  // Get admin token for API requests
  const getAdminToken = () => {
    return localStorage.getItem('adminToken');
  };

  const value = {
    admin,
    isAdminAuthenticated,
    isLoading,
    adminLogin,
    adminLogout,
    getAdminToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
