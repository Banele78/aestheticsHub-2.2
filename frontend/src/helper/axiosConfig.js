import axios from "axios";
import Cookies from 'js-cookie';

export const baseURL = 'https://aesthesticshub-77c2e00df573.herokuapp.com/api';

export const getImageUrl = `${baseURL}`;

export const axiosInstance = axios.create({
  baseURL,
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from cookies
    const authToken = Cookies.get('authToken') || ''; // Make sure to match the cookie name
    
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

