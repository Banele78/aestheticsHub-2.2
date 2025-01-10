import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {axiosInstance }from './axiosConfig'
import { useNavigate } from 'react-router-dom';

// Create Context
export const UserProfileContext = createContext();

// Create Provider Component
export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [postsUpdate, setPostsUpdate] = useState(false);

  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const response = await axiosInstance.get('/getUserProfile', { withCredentials: true });
        setUserProfile(response.data);
        console.log(response.data)
        setError(null);
        if(response.status=200){
          //setIsAuthenticated(true);
        }
        
      } catch (err) {
        //setError('Failed to fetch user profile data');
        console.log(err.response)
        //setIsAuthenticated(false);
        //navigate("/editProfile");
      } finally {
        setLoading(false);
      }
    };

   //if(isAuthenticated)
      fetchData();
    
  }, [isAuthenticated, postsUpdate]);

  return (
    <UserProfileContext.Provider value={{ userProfile, loading,setLoading, error, isAuthenticated, setIsAuthenticated, postsUpdate, setPostsUpdate}}>
      {children}
    </UserProfileContext.Provider>
  );
};