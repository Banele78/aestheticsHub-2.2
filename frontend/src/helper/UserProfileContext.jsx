import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const UserProfileContext = createContext();

// Create Provider Component
export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getUserProfile');
        setUserProfile(response.data);
        setError(null);
        if(response.status ==200){
          setIsAuthenticated(true);
        }
      } catch (err) {
        setError('Failed to fetch user profile data');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    
      fetchData();
    
  }, [isAuthenticated]);

  return (
    <UserProfileContext.Provider value={{ userProfile, loading, error, isAuthenticated ,setIsAuthenticated}}>
      {children}
    </UserProfileContext.Provider>
  );
};
