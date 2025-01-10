import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from './helper/axiosConfig';
import { UserProfileContext } from './helper/UserProfileContext';

const ProtectedRoute = ({ children }) => {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {isAuthenticated, setIsAuthenticated } = useContext(UserProfileContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth',{ withCredentials: true } );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
        console.log(err.response)
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Prevent flickering
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

