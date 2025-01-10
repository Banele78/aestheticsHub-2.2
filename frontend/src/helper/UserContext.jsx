import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {axiosInstance }from './axiosConfig'
import { useNavigate } from 'react-router-dom';

// Create Context
export const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/auth");
        setUser(response.data);
        console.log(response.data)
        setError(null);
        if(response.status=200){
          setIsAuthenticated(true);
        }
        
      } catch (err) {
        setError('Failed to fetch user profile data');
        setIsAuthenticated(false)
       
      } finally {
        setLoading(false);
      }
    };
      fetchData();
    
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, isAuthenticated ,setIsAuthenticated}}>
      {children}
    </UserContext.Provider>
  );
};
