import axios from "axios";

export const baseURL = 'http://192.168.0.238:8080/api';

export const getImageUrl = `${baseURL}`;

export const axiosInstance = axios.create({
  baseURL,
});

