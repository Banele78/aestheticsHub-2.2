import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from './axiosConfig';
import { useNavigate } from 'react-router-dom';

// Create Context
export const UserProfileContext = createContext();

// Create Provider Component
export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [postsUpdate, setPostsUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming the server responds with status 200 and user profile data
        const response = await axiosInstance.get('/getUserProfile', { withCredentials: true });
        if (response.status === 200) {
          setUserProfile(response.data);
          setIsAuthenticated(true);  // Set authenticated state to true
          setError(null);  // Reset error if the request is successful
        }
      } catch (err) {
        console.error("Error fetching user profile:", err.response);
        setError("Failed to fetch user profile data");
        setIsAuthenticated(false);  // In case of error, set as unauthenticated
        navigate("/editProfile");  // Redirect to edit profile page or login
      } finally {
        setLoading(false);
      }
    };

    fetchData();  // Only fetch once on component mount or when postsUpdate changes
  }, [postsUpdate]);  // Dependency on postsUpdate for when updates occur

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        loading,
        setLoading,
        error,
        isAuthenticated,
        setIsAuthenticated,
        postsUpdate,
        setPostsUpdate,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
