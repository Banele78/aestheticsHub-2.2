import axios from "axios";

export const baseURL = 'https://aesthesticshub-77c2e00df573.herokuapp.com/api';

export const getImageUrl = `${baseURL}`;

export const axiosInstance = axios.create({
  baseURL,
});

